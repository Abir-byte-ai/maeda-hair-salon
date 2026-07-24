# Drop your video here

The hero section has a curved-edge, 1:1 (square) video frame ready for your
5-second clip.

## Steps

1. Name your file **`reel.mp4`** (this exact name — it's already wired up in
   `index.html`).
2. Make sure it's **square (1:1)** — e.g. 1080×1080 or 720×720. If it isn't
   square, the frame will still show it with `object-fit: cover`, which
   crops the edges rather than squashing it — but square source footage
   will always look best.
3. Drop it directly into this folder: `assets/video/reel.mp4`
4. Optional but recommended: also add **`reel-poster.jpg`** — a single still
   frame from the video, same folder. It displays instantly while the video
   loads and is shown to anyone on a slow connection or with autoplay
   disabled.
5. Open `index.html` — the placeholder graphic disappears automatically and
   your video plays on loop, muted, inside the rounded frame.

## Format notes

- **MP4 (H.264)** is the safest choice for broad browser support.
- Keep the file reasonably small (a 5-second 1080×1080 clip should
  comfortably be under 8–10 MB) so the page stays fast on mobile data.
- The video is served with `muted`, `loop`, `playsinline`, and `autoplay` —
  browsers require `muted` for autoplay to work, so it will not have audio
  on the landing page regardless of the source file.

## Security note

Video files are treated as ordinary static assets here — no upload form or
processing pipeline touches them, so there's no injection surface. If you
ever add a visitor-facing upload feature later, that's a very different
(and much higher-risk) piece of engineering — validate file type by
content/magic-bytes (not just the extension), enforce a strict size limit,
and never serve user-uploaded files from the same origin as the main site.
