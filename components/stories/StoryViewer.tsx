"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Heart, Send, MoreHorizontal } from "lucide-react";
import { MOCK_STORIES } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { timeAgo } from "@/lib/data";

export default function StoryViewer() {
  const { showStoryViewer, storyViewerIndex, setShowStoryViewer } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(storyViewerIndex);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const story = MOCK_STORIES[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < MOCK_STORIES.length - 1) {
      setCurrentIndex(i => i + 1);
      setProgress(0);
    } else {
      setShowStoryViewer(false);
    }
  }, [currentIndex, setShowStoryViewer]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    setCurrentIndex(storyViewerIndex);
    setProgress(0);
  }, [storyViewerIndex]);

  useEffect(() => {
    if (!showStoryViewer || paused) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { goNext(); return 0; }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [showStoryViewer, paused, goNext]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowStoryViewer(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, setShowStoryViewer]);

  if (!showStoryViewer || !story) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in"
      onClick={() => setShowStoryViewer(false)}
    >
      <div
        className="relative w-full max-w-sm h-[calc(100svh-40px)] max-h-[780px] rounded-2xl overflow-hidden bg-black shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Progress bars */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-1">
          {MOCK_STORIES.map((_, i) => (
            <div key={i} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-none"
                style={{
                  width: i < currentIndex ? "100%" : i === currentIndex ? `${progress}%` : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 z-10 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white/50">
            <Image
              src={story.author.avatar}
              alt={story.author.username}
              width={36}
              height={36}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-semibold">{story.author.username}</p>
            <p className="text-white/60 text-xs">{timeAgo(story.createdAt)} ago</p>
          </div>
          <button className="text-white/80 hover:text-white p-1">
            <MoreHorizontal size={20} />
          </button>
          <button
            onClick={() => setShowStoryViewer(false)}
            className="text-white/80 hover:text-white p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Story media */}
        <div
          className="w-full h-full"
          onMouseDown={() => setPaused(true)}
          onMouseUp={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <Image
            src={story.media}
            alt="story"
            fill
            className="object-cover"
          />
        </div>

        {/* Nav areas */}
        <button
          onClick={goPrev}
          className="absolute left-0 top-0 h-full w-1/3 z-10 flex items-center pl-2 opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} className="text-white drop-shadow-lg" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-0 top-0 h-full w-1/3 z-10 flex items-center justify-end pr-2 opacity-0 hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} className="text-white drop-shadow-lg" />
        </button>

        {/* Reply bar */}
        <div className="absolute bottom-6 left-4 right-4 z-10 flex items-center gap-3">
          <div className="flex-1 bg-white/10 backdrop-blur rounded-full px-4 py-2.5 border border-white/20">
            <input
              type="text"
              placeholder="Reply to story..."
              className="w-full bg-transparent text-white text-sm placeholder-white/50 outline-none"
            />
          </div>
          <button className="text-white p-1">
            <Heart size={22} />
          </button>
          <button className="text-white p-1">
            <Send size={22} />
          </button>
        </div>
      </div>

      {/* Close button outside */}
      <button
        onClick={() => setShowStoryViewer(false)}
        className="absolute top-4 right-4 text-white/70 hover:text-white"
      >
        <X size={28} />
      </button>
    </div>
  );
}
