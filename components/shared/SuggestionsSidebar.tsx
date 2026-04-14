"use client";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { MOCK_USERS } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { formatCount } from "@/lib/data";

export default function SuggestionsSidebar() {
  const { currentUser, toggleFollow } = useAppStore();
  const suggestions = MOCK_USERS.filter(u => u.id !== currentUser.id && !u.isFollowing).slice(0, 5);

  return (
    <aside className="w-80 py-6 px-4 hidden xl:block flex-shrink-0">
      {/* Current user */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/profile" className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
            <Image
              src={currentUser.avatar}
              alt={currentUser.username}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <Link href="/profile" className="text-sm font-semibold text-[var(--text)] hover:underline truncate">
              {currentUser.username}
            </Link>
            {currentUser.isVerified && <BadgeCheck size={13} className="text-sky-500 flex-shrink-0" />}
          </div>
          <p className="text-sm text-[var(--text-muted)] truncate">{currentUser.displayName}</p>
        </div>
        <Link href="/profile" className="text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors">
          Switch
        </Link>
      </div>

      {/* Suggestions */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--text-muted)]">Suggested for you</p>
        <Link href="/explore" className="text-xs font-semibold text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">
          See All
        </Link>
      </div>

      <div className="space-y-3">
        {suggestions.map(user => (
          <div key={user.id} className="flex items-center gap-3">
            <Link href="/profile" className="flex-shrink-0">
              <div className="relative">
                {user.hasStory ? (
                  <div className="w-9 h-9 rounded-full p-[2px] bg-gradient-story">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg)] p-[1.5px]">
                      <Image src={user.avatar} alt={user.username} width={32} height={32} className="w-full h-full object-cover rounded-full" />
                    </div>
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
                    <Image src={user.avatar} alt={user.username} width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <Link href="/profile" className="text-xs font-semibold text-[var(--text)] hover:underline truncate">
                  {user.username}
                </Link>
                {user.isVerified && <BadgeCheck size={11} className="text-sky-500 flex-shrink-0" />}
              </div>
              <p className="text-xs text-[var(--text-muted)] truncate">
                {formatCount(user.followers)} followers
              </p>
            </div>
            <button
              onClick={() => toggleFollow(user.id)}
              className="text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors"
            >
              Follow
            </button>
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div className="mt-8 flex flex-wrap gap-x-2 gap-y-1">
        {["About", "Help", "Press", "API", "Privacy", "Terms", "Locations", "Language"].map(l => (
          <a key={l} href="#" className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            {l}
          </a>
        ))}
        <p className="w-full text-[11px] text-[var(--text-muted)] mt-1">© 2025 Pixora</p>
      </div>
    </aside>
  );
}
