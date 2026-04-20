import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Plus, Trash2, Baby, Check } from "lucide-react";
import { useProfiles, AVATAR_OPTIONS, MAX_PROFILES, type Profile } from "@/hooks/useProfiles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Profiles = () => {
  const navigate = useNavigate();
  const { profiles, addProfile, updateProfile, deleteProfile, selectProfile } = useProfiles();
  const [manageMode, setManageMode] = useState(false);
  const [editing, setEditing] = useState<Profile | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Profile | null>(null);

  const handleSelect = (p: Profile) => {
    if (manageMode) return;
    selectProfile(p.id);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-16">
      <motion.h1
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-display text-4xl md:text-6xl text-foreground tracking-tight mb-12 text-center"
      >
        {manageMode ? "Manage Profiles" : "Who's watching?"}
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-5xl">
        <AnimatePresence>
          {profiles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="flex flex-col items-center gap-3 group cursor-pointer"
              onClick={() => handleSelect(p)}
            >
              <div className="relative">
                <div
                  className={`w-28 h-28 md:w-36 md:h-36 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center text-5xl md:text-6xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-2 ring-transparent group-hover:ring-foreground transition-all duration-200 group-hover:scale-105`}
                >
                  <span>{p.avatar}</span>
                  {manageMode && (
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center">
                      <Pencil className="w-8 h-8 text-foreground" />
                    </div>
                  )}
                </div>
                {manageMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmDelete(p);
                    }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg hover:scale-110 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                {p.isKids && !manageMode && (
                  <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-bold flex items-center gap-1">
                    <Baby className="w-3 h-3" /> KIDS
                  </div>
                )}
              </div>
              <button
                onClick={(e) => {
                  if (manageMode) {
                    e.stopPropagation();
                    setEditing(p);
                  }
                }}
                className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors"
              >
                {p.name}
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {profiles.length < MAX_PROFILES && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: profiles.length * 0.05 }}
            onClick={() => setCreating(true)}
            className="flex flex-col items-center gap-3 group"
          >
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-lg border-2 border-dashed border-muted-foreground/40 flex items-center justify-center group-hover:border-foreground transition">
              <Plus className="w-12 h-12 text-muted-foreground group-hover:text-foreground transition" />
            </div>
            <span className="text-sm md:text-base text-muted-foreground group-hover:text-foreground transition">
              Add Profile
            </span>
          </motion.button>
        )}
      </div>

      <Button
        variant="outline"
        size="lg"
        className="mt-12 tracking-widest"
        onClick={() => setManageMode(!manageMode)}
      >
        {manageMode ? "Done" : "Manage Profiles"}
      </Button>

      {/* Create / Edit dialog */}
      <ProfileDialog
        open={creating || !!editing}
        profile={editing}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        onSave={(data) => {
          if (editing) updateProfile(editing.id, data);
          else addProfile(data);
          setCreating(false);
          setEditing(null);
        }}
      />

      {/* Delete confirm */}
      <Dialog open={!!confirmDelete} onOpenChange={(o) => !o && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete profile?</DialogTitle>
            <DialogDescription>
              This will permanently remove "{confirmDelete?.name}" and their viewing history.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (confirmDelete) deleteProfile(confirmDelete.id);
                setConfirmDelete(null);
              }}
            >
              Delete profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ProfileDialogProps {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
  onSave: (data: { name: string; avatar: string; color: string; isKids: boolean }) => void;
}

const ProfileDialog = ({ open, profile, onClose, onSave }: ProfileDialogProps) => {
  const [name, setName] = useState(profile?.name ?? "");
  const [avatarIdx, setAvatarIdx] = useState(() => {
    const idx = AVATAR_OPTIONS.findIndex((a) => a.key === profile?.avatar);
    return idx >= 0 ? idx : 0;
  });
  const [isKids, setIsKids] = useState(profile?.isKids ?? false);

  // Reset when dialog re-opens
  useState(() => {
    setName(profile?.name ?? "");
    setIsKids(profile?.isKids ?? false);
  });

  const handleSubmit = () => {
    if (!name.trim()) return;
    const av = AVATAR_OPTIONS[avatarIdx];
    onSave({ name: name.trim().slice(0, 24), avatar: av.key, color: av.color, isKids });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
        else {
          setName(profile?.name ?? "");
          setAvatarIdx(Math.max(0, AVATAR_OPTIONS.findIndex((a) => a.key === profile?.avatar)));
          setIsKids(profile?.isKids ?? false);
        }
      }}
    >
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{profile ? "Edit Profile" : "Add Profile"}</DialogTitle>
          <DialogDescription>
            Pick an avatar, give it a name, and choose access level.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div>
            <Label htmlFor="profile-name" className="text-sm text-muted-foreground">
              Name
            </Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Profile name"
              maxLength={24}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Avatar</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {AVATAR_OPTIONS.map((av, i) => (
                <button
                  key={av.key}
                  type="button"
                  onClick={() => setAvatarIdx(i)}
                  className={`relative aspect-square rounded-md bg-gradient-to-br ${av.color} flex items-center justify-center text-2xl transition-all ${
                    avatarIdx === i
                      ? "ring-2 ring-foreground scale-105"
                      : "ring-1 ring-transparent hover:ring-muted-foreground/40"
                  }`}
                >
                  {av.key}
                  {avatarIdx === i && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <Label className="text-sm font-medium">Kids profile</Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Restrict to age-appropriate content (G/PG).
              </p>
            </div>
            <Switch checked={isKids} onCheckedChange={setIsKids} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            {profile ? "Save changes" : "Create profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Profiles;
