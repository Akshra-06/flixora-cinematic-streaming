import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Play, Pause, Volume2, VolumeX, Maximize, Minimize,
  ArrowLeft, SkipForward, Settings, Rewind, FastForward,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { getById, getNextEpisode, type Content } from "@/data/movies";
import { useWatchHistory } from "@/hooks/useWatchHistory";
import { usePlaybackProgress } from "@/hooks/usePlaybackProgress";

const formatTime = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
};

const Watch = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getById(Number(id));
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();
  const saveTimer = useRef<ReturnType<typeof setInterval>>();
  const { recordWatch } = useWatchHistory();
  const { getProgress, saveProgress } = usePlaybackProgress();

  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showNextOverlay, setShowNextOverlay] = useState(false);
  const [nextCountdown, setNextCountdown] = useState(10);
  const [resumed, setResumed] = useState(false);

  const nextItem: Content | undefined = item ? getNextEpisode(item) : undefined;

  // Record watch + resume from saved progress
  useEffect(() => {
    if (item) {
      recordWatch(item.id);
      const saved = getProgress(item.id);
      if (saved && !resumed) {
        const v = videoRef.current;
        if (v) {
          v.currentTime = saved.time;
        }
        setResumed(true);
      }
    }
  }, [item, recordWatch, getProgress, resumed]);

  // Periodically save playback progress
  useEffect(() => {
    saveTimer.current = setInterval(() => {
      const v = videoRef.current;
      if (v && item && v.duration) {
        saveProgress(item.id, v.currentTime, v.duration);
      }
    }, 5000);
    return () => {
      if (saveTimer.current) clearInterval(saveTimer.current);
      // Save on unmount
      const v = videoRef.current;
      if (v && item && v.duration) {
        saveProgress(item.id, v.currentTime, v.duration);
      }
    };
  }, [item, saveProgress]);

  // Auto-hide controls
  const bumpControls = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!videoRef.current?.paused) setShowControls(false);
    }, 3000);
  }, []);

  useEffect(() => {
    bumpControls();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [bumpControls]);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key.toLowerCase() === "k") { e.preventDefault(); togglePlay(); }
      if (e.key.toLowerCase() === "m") toggleMute();
      if (e.key.toLowerCase() === "f") toggleFullscreen();
      if (e.key === "ArrowRight") seek(10);
      if (e.key === "ArrowLeft") seek(-10);
      if (e.key === "Escape" && !document.fullscreenElement) navigate(-1);
      bumpControls();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!showNextOverlay) return;
    setNextCountdown(10);
    const tick = setInterval(() => {
      setNextCountdown(n => {
        if (n <= 1) {
          clearInterval(tick);
          if (nextItem) navigate(`/watch/${nextItem.id}`);
          return 0;
        }
        return n - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [showNextOverlay, nextItem, navigate]);

  if (!item) {
    return (
      <div className="h-screen flex items-center justify-center bg-background text-foreground">
        Title not found.
      </div>
    );
  }

  const togglePlay = () => {
    const v = videoRef.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
  };
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) await containerRef.current.requestFullscreen();
    else await document.exitFullscreen();
  };
  const seek = (sec: number) => {
    const v = videoRef.current; if (!v) return;
    v.currentTime = Math.min(Math.max(0, v.currentTime + sec), v.duration || 0);
  };
  const onScrub = (val: number[]) => {
    const v = videoRef.current; if (!v || !duration) return;
    v.currentTime = (val[0] / 100) * duration;
    setProgress(val[0]);
  };
  const onVolume = (val: number[]) => {
    const v = videoRef.current; if (!v) return;
    const nv = val[0] / 100;
    v.volume = nv; v.muted = nv === 0;
    setVolume(nv); setMuted(nv === 0);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen bg-black overflow-hidden"
      style={{ cursor: showControls ? "default" : "none" }}
      onMouseMove={bumpControls}
      onClick={(e) => { if (e.target === e.currentTarget) togglePlay(); }}
    >
      <video
        ref={videoRef}
        src={item.videoUrl}
        autoPlay
        className="absolute inset-0 w-full h-full object-contain bg-black"
        onClick={togglePlay}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          // Resume on metadata load
          if (item) {
            const saved = getProgress(item.id);
            if (saved) e.currentTarget.currentTime = saved.time;
          }
        }}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          setProgress((v.currentTime / (v.duration || 1)) * 100);
          if (v.duration && v.duration - v.currentTime <= 15 && !showNextOverlay) {
            setShowNextOverlay(true);
          }
        }}
        onEnded={() => nextItem && navigate(`/watch/${nextItem.id}`)}
      />

      {/* Top gradient */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/80 via-transparent to-black/90"
          />
        )}
      </AnimatePresence>

      {/* Top bar */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 inset-x-0 p-6 flex items-center gap-4 z-10"
          >
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 rounded-full bg-background/40 backdrop-blur-md flex items-center justify-center hover:bg-background/60 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground uppercase tracking-widest">
                {item.type === "tv" ? "Now Watching • Episode" : "Now Watching"}
              </span>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">{item.title}</h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center play indicator */}
      <AnimatePresence>
        {!playing && (
          <motion.button
            initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }}
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary flex items-center justify-center neon-glow z-10"
          >
            <Play className="w-9 h-9 fill-primary-foreground text-primary-foreground ml-1" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Bottom controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            className="absolute bottom-0 inset-x-0 p-6 z-10"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono text-muted-foreground w-12 text-right">
                {formatTime(((progress / 100) * duration) || 0)}
              </span>
              <Slider
                value={[progress]} max={100} step={0.1} onValueChange={onScrub}
                className="flex-1 [&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary [&_.bg-primary]:bg-primary"
              />
              <span className="text-xs font-mono text-muted-foreground w-12">
                -{formatTime(duration - ((progress / 100) * duration) || 0)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="hover:scale-110 transition">
                {playing ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 fill-foreground" />}
              </button>
              <button onClick={() => seek(-10)} className="hover:scale-110 transition" aria-label="Rewind 10s">
                <Rewind className="w-6 h-6" />
              </button>
              <button onClick={() => seek(10)} className="hover:scale-110 transition" aria-label="Forward 10s">
                <FastForward className="w-6 h-6" />
              </button>
              {nextItem && (
                <button
                  onClick={() => navigate(`/watch/${nextItem.id}`)}
                  className="hover:scale-110 transition"
                  aria-label="Next"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              )}

              <div className="flex items-center gap-2 group">
                <button onClick={toggleMute} className="hover:scale-110 transition">
                  {muted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
                <div className="w-0 group-hover:w-24 overflow-hidden transition-all duration-300">
                  <Slider value={[muted ? 0 : volume * 100]} max={100} onValueChange={onVolume} />
                </div>
              </div>

              <div className="flex-1 text-center hidden md:block">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.title} <span className="text-foreground/50">• {item.year}</span>
                </span>
              </div>

              <button className="hover:scale-110 transition" aria-label="Settings">
                <Settings className="w-6 h-6" />
              </button>
              <button onClick={toggleFullscreen} className="hover:scale-110 transition" aria-label="Fullscreen">
                {fullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next-up overlay */}
      <AnimatePresence>
        {showNextOverlay && nextItem && (
          <motion.div
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
            className="absolute bottom-32 right-6 w-80 bg-card/90 backdrop-blur-md border border-border rounded-lg overflow-hidden shadow-2xl z-20"
          >
            <div className="relative aspect-video">
              <img src={nextItem.image} alt={nextItem.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            </div>
            <div className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Up Next in {nextCountdown}s</p>
              <h3 className="font-bold text-lg mb-3">{nextItem.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/watch/${nextItem.id}`)}
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-primary-foreground" /> Play Now
                </button>
                <button
                  onClick={() => setShowNextOverlay(false)}
                  className="px-3 py-2 rounded border border-border hover:bg-secondary transition text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Watch;
