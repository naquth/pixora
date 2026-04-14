"use client";
import Image from "next/image";
import { Plus } from "lucide-react";
import { MOCK_STORIES } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function StoriesBar() {
  const { currentUser, setShowStoryViewer } = useAppStore();

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 px-4 border-b border-[var(--border)]">
      <div className="flex gap-4 items-center min-w-max">
        {/* Add story */}
        <button className="flex flex-col items-center gap-1.5 flex-shrink-0">
          <div className="relative w-16 h-16 rounded-full ring-2 ring-[var(--border)] overflow-hidden">
            <Image
              src={currentUser.avatar}
              alt="Your story"
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-sky-500 rounded-full flex items-center justify-center border-2 border-[var(--bg)]">
              <Plus size={10} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <span className="text-[11px] text-[var(--text-muted)] font-medium w-16 truncate text-center">
            Your story
          </span>
        </button>

        {/* Stories */}
        {MOCK_STORIES.map((story, i) => (
          <button
            key={story.id}
            onClick={() => setShowStoryViewer(true, i)}
            className="flex flex-col items-center gap-1.5 flex-shrink-0"
          >
            <div
              className={cn(
                "w-16 h-16 rounded-full p-[2px]",
                story.author.storyViewed
                  ? "bg-[var(--border)]"
                  : "bg-gradient-story"
              )}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg)] p-[2px]">
                <Image
                  src={story.author.avatar}
                  alt={story.author.username}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <span className="text-[11px] text-[var(--text-muted)] font-medium w-16 truncate text-center">
              {story.author.username}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
