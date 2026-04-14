# Pixora 📸

A modern, minimal Instagram-like social media platform built with Next.js 14, TypeScript, and Tailwind CSS.

## ✨ Features

- **Feed** — Stories bar, infinite-scroll posts, double-tap to like
- **Stories** — Full-screen story viewer with progress bars & keyboard navigation
- **Explore** — Masonry grid, search with suggestions, filter by people/tags/photos
- **Reels** — TikTok-style vertical video feed with actions
- **Notifications** — Real-time-style notification center with unread badges
- **Profile** — Grid view, story highlights, tabs (Posts / Reels / Saved / Tagged)
- **Messages** — DM inbox with chat interface, read receipts, online status
- **Saved** — Bookmarked posts collection
- **Create Post** — Multi-step wizard with filter picker & caption editor
- **Settings** — Account, Privacy, Notifications, Appearance (dark mode toggle)
- **Auth** — Login & multi-step Register pages

## 🚀 Deploy to Vercel

### Option 1: One-click (recommended)
Push this repo to GitHub then import at [vercel.com/new](https://vercel.com/new).

### Option 2: CLI
```bash
npm install -g vercel
vercel deploy
```

## 🛠 Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — it auto-redirects to `/feed`.

## 🏗 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Zustand | State management |
| Lucide React | Icons |
| next/image | Optimized images |
| DM Sans + Playfair Display | Typography |

## 📁 Project Structure

```
pixora/
├── app/
│   ├── feed/           # Home feed
│   ├── explore/        # Search & discover
│   ├── reels/          # Vertical video feed
│   ├── notifications/  # Activity center
│   ├── profile/        # User profile
│   ├── messages/       # Direct messages
│   ├── saved/          # Bookmarks
│   ├── settings/       # App settings
│   ├── login/          # Auth
│   └── register/       # Sign up
├── components/
│   ├── layout/         # Sidebar, MobileNav, ThemeProvider
│   ├── post/           # PostCard, PostModal, CreatePostModal
│   ├── stories/        # StoriesBar, StoryViewer
│   └── shared/         # SuggestionsSidebar
├── lib/
│   ├── data.ts         # Mock data & helpers
│   ├── store.ts        # Zustand global store
│   └── utils.ts        # cn() utility
└── types/
    └── index.ts        # TypeScript types
```

## 🎨 Design

- **Palette** — Sky blue accent (`#0ea5e9`) on clean white/near-black surfaces
- **Typography** — DM Sans (body) + Playfair Display (logo/headings)
- **Dark mode** — Full dark theme via CSS variables
- **Mobile-first** — Responsive sidebar collapses to icon-only, mobile bottom nav

---

Built with ❤️ using Claude AI
