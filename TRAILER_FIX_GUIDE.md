# 🎬 Trailer Loading Fix - Complete Guide

## Problem Analysis

Your trailer was **never loading** because of multiple interconnected issues:

### **Critical Issue #1: Hardcoded `false` (Line 268)**

```tsx
{false && trailerUrl ? (  // ❌ BLOCKED: Never renders iframe
  <iframe src={trailerUrl} .../>
```

The iframe was **never rendered** regardless of whether `trailerUrl` existed. This is why the fallback was always being used.

### **Issue #2: No URL Validation**

The API returns `youtubeEmbedUrl`, but there was no validation that it's actually a valid YouTube embed URL before rendering.

### **Issue #3: Missing iframe Error Handler**

- No `onError` handler on iframe
- Couldn't detect CORS or network failures
- Network errors couldn't be caught

### **Issue #4: Weak Loading Detection**

The timeout logic was generic and didn't properly detect iframe blocking/CORS issues.

### **Issue #5: Aggressive Fallback**

Any API error immediately triggered fallback without proper error differentiation.

---

## ✅ Fixes Applied

### **Fix #1: Remove Hardcoded `false`**

```tsx
// ❌ BEFORE
{false && trailerUrl ? (

// ✅ AFTER
{trailerUrl && !useFallback ? (
```

Now iframe only renders when:

- `trailerUrl` exists (API returned a URL)
- `useFallback` is false (no errors detected)

---

### **Fix #2: Add YouTube URL Validation**

```tsx
const isValidYouTubeEmbed = (url: string): boolean => {
  try {
    const u = new URL(url);
    return (
      u.hostname.includes("youtube") ||
      u.hostname.includes("youtu.be") ||
      u.hostname.includes("youtube-nocookie")
    );
  } catch {
    return false;
  }
};
```

Validates URL format before rendering:

- Checks hostname is actually YouTube
- Handles malformed URLs safely
- Prevents rendering invalid URLs

In fetch logic:

```tsx
if (!isValidYouTubeEmbed(url)) {
  console.error("[Trailer] Invalid YouTube URL format:", url);
  setTrailerUrl(null);
  setUseFallback(true);
  return;
}
```

---

### **Fix #3: Add iframe Error Handlers**

**onLoad Handler:**

```tsx
onLoad={() => {
  console.log("[Trailer] Iframe onLoad fired");
  iframeLoadedRef.current = true;
  // Clear timeout since iframe loaded successfully
  if (trailerTimeoutRef.current) {
    clearTimeout(trailerTimeoutRef.current);
  }
}}
```

- Confirms iframe successfully loaded
- Clears the failure timeout (no fallback needed)
- Logs success for debugging

**onError Handler:**

```tsx
onError={() => {
  console.error("[Trailer] Iframe onError fired → using fallback");
  iframeLoadedRef.current = false;
  setUseFallback(true);
}}
```

- Catches CORS, network, and permission errors
- Immediately triggers fallback
- Logs error for debugging

**Sandbox Attribute:**

```tsx
sandbox = "allow-presentation allow-same-origin allow-scripts allow-popups";
```

- Allows YouTube to function properly
- Restricts dangerous operations (still secure)
- Prevents some CORS issues

---

### **Fix #4: Improved Loading Timeout**

```tsx
useEffect(() => {
  if (!trailerUrl) return;

  iframeLoadedRef.current = false;

  if (trailerTimeoutRef.current) {
    clearTimeout(trailerTimeoutRef.current);
  }

  // If iframe doesn't signal load within 5 seconds, fall back
  trailerTimeoutRef.current = setTimeout(() => {
    if (!iframeLoadedRef.current) {
      console.warn(
        "[Trailer] Iframe did not load within timeout (5s) → using fallback",
      );
      setUseFallback(true);
    }
  }, 5000);

  return () => {
    if (trailerTimeoutRef.current) {
      clearTimeout(trailerTimeoutRef.current);
    }
  };
}, [trailerUrl]);
```

Logic:

- Starts fresh timeout for each new trailer URL
- Clears previous timeout to avoid overlaps
- 5-second timeout (enough for YouTube to load)
- Fallback only if no onLoad signal within 5 seconds

---

### **Fix #5: Better Error Handling in Fetch**

```tsx
const fetchTrailer = async () => {
  if (!item?.tmdbId) {
    console.warn("[Trailer] No TMDB ID provided, using fallback");
    setTrailerUrl(null);
    setUseFallback(true);
    return;
  }

  setTrailerLoading(true);
  setUseFallback(false); // Reset fallback before fetching

  try {
    const endpoint = `...trailer/${item.tmdbId}?mediaType=${mediaType}`;
    console.log("[Trailer] Fetching from:", endpoint);

    const response = await authFetch(endpoint);
    const payload = await response.json();

    console.log(
      "[Trailer] Response status:",
      response.status,
      "Body:",
      payload,
    );

    if (response.ok && payload?.data?.youtubeEmbedUrl) {
      const url = payload.data.youtubeEmbedUrl;

      // Validate before using
      if (!isValidYouTubeEmbed(url)) {
        console.error("[Trailer] Invalid YouTube URL format:", url);
        setTrailerUrl(null);
        setUseFallback(true);
        setTrailerLoading(false);
        return;
      }

      console.log("[Trailer] Valid YouTube URL found:", url);
      setTrailerUrl(url);
      setUseFallback(false);
    } else {
      console.warn("[Trailer] No valid trailer in response:", payload);
      setTrailerUrl(null);
      setUseFallback(true);
    }
  } catch (error) {
    console.error("[Trailer] Fetch failed:", error);
    setTrailerUrl(null);
    setUseFallback(true);
  } finally {
    setTrailerLoading(false);
  }
};
```

Improvements:

- `setUseFallback(false)` resets state before fetching
- Logs endpoint for debugging API issues
- Logs response status and body
- Validates URL format
- Proper `finally` block ensures loading state is always cleared
- Better error messages with context

---

## 🔍 Debugging: How to Check Browser Console

Open **DevTools** (F12) and look for these logs:

### Success Case:

```
[Trailer] Fetching from: https://flixora-cinematic-streaming.onrender.com/api/movies/trailer/12345?mediaType=movie
[Trailer] Response status: 200 Body: {data: {youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/..."}}
[Trailer] Valid YouTube URL found: https://www.youtube-nocookie.com/embed/...
[Trailer] Iframe onLoad fired
```

### CORS/Blocked Error:

```
[Trailer] Fetching from: https://...
[Trailer] Response status: 200 Body: {data: {youtubeEmbedUrl: "https://..."}}
[Trailer] Valid YouTube URL found: https://...
[Trailer] Iframe onError fired → using fallback
```

→ Shows CORS or permission issue with YouTube embed

### No Trailer Available:

```
[Trailer] Fetching from: https://...
[Trailer] Response status: 200 Body: {data: null}
[Trailer] No valid trailer in response: {data: null}
```

→ API returned no trailer (trailer doesn't exist in TMDB)

### Timeout (Slow Loading):

```
[Trailer] Fetching from: https://...
[Trailer] Response status: 200 Body: {data: {youtubeEmbedUrl: "https://..."}}
[Trailer] Valid YouTube URL found: https://...
[Trailer] Iframe did not load within timeout (5s) → using fallback
```

→ Network is slow or iframe is being blocked

---

## 🎯 When Fallback is Triggered (Correctly)

Fallback will now ONLY trigger when:

1. ✅ **API returns no trailer URL** → Fallback
2. ✅ **URL is invalid format** → Fallback
3. ✅ **Iframe error event fires** (CORS/security) → Fallback
4. ✅ **Timeout after 5 seconds** (slow/blocked) → Fallback
5. ✅ **No TMDB ID available** → Fallback

---

## 📝 State Management

```tsx
const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
const [trailerLoading, setTrailerLoading] = useState(false);
const [useFallback, setUseFallback] = useState(false);
```

**Flow:**

1. User loads page → Fetch trailer from API
2. API returns URL → Validate it
3. URL valid → Render iframe with timeout
4. iframe.onLoad fires → Success! Timeout cleared
5. If error/timeout → Set `useFallback = true` → Show video tag
6. User navigates to different movie → Reset `useFallback = false` → Try again

---

## 🚀 Testing the Fix

### Test Case 1: Movie with Trailer

```
Go to a popular movie (e.g., Avatar, Inception)
Expected: Trailer plays in iframe
Console: Should see "[Trailer] Iframe onLoad fired"
```

### Test Case 2: Movie without Trailer

```
Go to an obscure or older movie
Expected: Fallback video plays
Console: Should see "[Trailer] No valid trailer in response"
```

### Test Case 3: Network Error

```
Open DevTools → Network tab → Throttle to "Slow 3G"
Go to a movie page
Expected: After 5 seconds, fallback video plays
Console: Should see "[Trailer] Iframe did not load within timeout (5s)"
```

---

## 🔧 Common Issues & Solutions

### Issue: Trailer still not loading

**Solution:**

1. Check console for `[Trailer]` logs
2. If you see `Fetching from:` but then nothing → API is slow/failing
3. If you see `Valid YouTube URL found:` but then fallback → CORS or network issue
4. Check if YouTube embed is allowed in your domain (Vercel settings)

### Issue: Fallback plays even though trailer should be available

**Solution:**

1. Check if API endpoint is returning correct URL
2. Verify YouTube embed URL format: `https://www.youtube-nocookie.com/embed/{VIDEO_ID}`
3. Check Vercel CORS headers allow YouTube

### Issue: Timeout seems too short

**Solution:**
Adjust timeout in useEffect (currently 5000ms = 5 seconds):

```tsx
trailerTimeoutRef.current = setTimeout(() => {
  // ...
}, 5000); // ← Change this number (in milliseconds)
```

Try 7000 for 7 seconds on slower networks.

---

## 📚 Related Files

- [Watch.tsx](./src/pages/Watch.tsx) - Main player component
- Backend trailer API: `GET /api/movies/trailer/:tmdbId?mediaType={tv|movie}`

---

## Summary

| What Was Fixed          | Why It Matters              | Result                           |
| ----------------------- | --------------------------- | -------------------------------- |
| Removed `false &&`      | Iframe was never rendered   | Trailer now attempts to load     |
| Added URL validation    | Invalid URLs were rendering | Only valid YouTube URLs render   |
| Added onError handler   | Errors weren't caught       | CORS errors now trigger fallback |
| Improved timeout logic  | Weak detection of issues    | Reliably detects 5-sec timeouts  |
| Better logging          | No visibility into issues   | Can now debug via console        |
| Reset fallback on fetch | Stale state remained        | Fresh attempt for each movie     |

**The trailer should now load correctly, with fallback only triggering when truly necessary!** 🎉
