"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, X, TrendingUp, Hash, Users } from "lucide-react";
import { MOCK_EXPLORE_POSTS, MOCK_USERS, formatCount } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle } from "lucide-react";

const TAGS = [
  { name: "photography", count: 842000 },
  { name: "travel", count: 1200000 },
  { name: "food", count: 980000 },
  { name: "art", count: 650000 },
  { name: "fitness", count: 720000 },
  { name: "design", count: 430000 },
];

type FilterTab = "all" | "photos" | "videos" | "people" | "tags";

export default function ExploreClient() {
  const { setSelectedPost } = useAppStore();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [focused, setFocused] = useState(false);

  const filters: FilterTab[] = ["all", "photos", "videos", "people", "tags"];

  return (
    <div className="max-w-[935px] mx-auto px-4 py-6">
      {/* Search bar */}
      <div className="relative mb-6">
        <div className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-200",
          focused
            ? "border-[var(--accent)] bg-[var(--bg)] shadow-md shadow-sky-100 dark:shadow-sky-900/20"
            : "border-[var(--border)] bg-[var(--bg-subtle)]"
        )}>
          <Search size={18} className="text-[var(--text-muted)] flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            placeholder="Search photos, people, tags…"
            className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-[var(--text-muted)] hover:text-[var(--text)]">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search suggestions dropdown */}
        {focused && query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg)] border border-[var(--border)] rounded-2xl shadow-xl z-20 overflow-hidden animate-slide-up">
            <div className="p-3">
              <p className="text-xs font-semibold text-[var(--text-muted)] px-2 mb-2">People</p>
              {MOCK_USERS.filter(u => u.username.includes(query.toLowerCase()) || u.displayName.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(user => (
                <div key={user.id} className="flex items-center gap-3 px-2 py-2 hover:bg-[var(--bg-subtle)] rounded-xl cursor-pointer transition-colors">
                  <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={user.avatar} alt={user.username} width={36} height={36} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text)]">{user.username}</p>
                    <p className="text-xs text-[var(--text-muted)]">{user.displayName} • {formatCount(user.followers)} followers</p>
                  </div>
                </div>
              ))}
              {MOCK_USERS.filter(u => u.username.includes(query.toLowerCase())).length === 0 && (
                <p className="text-sm text-[var(--text-muted)] px-2 py-2">No results for "{query}"</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize",
              activeFilter === f
                ? "bg-[var(--text)] text-[var(--bg)]"
                : "bg-[var(--bg-muted)] text-[var(--text-muted)] hover:bg-[var(--border)] hover:text-[var(--text)]"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* People section (when "people" filter) */}
      {activeFilter === "people" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
          {MOCK_USERS.map(user => (
            <div key={user.id} className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-[var(--border)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer text-center">
              <div className={cn("rounded-full p-[2px]", user.hasStory && !user.storyViewed ? "bg-gradient-story" : "bg-[var(--border)]")}>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--bg)] p-[2px]">
                  <Image src={user.avatar} alt={user.username} width={60} height={60} className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{user.username}</p>
                <p className="text-xs text-[var(--text-muted)]">{formatCount(user.followers)} followers</p>
              </div>
              <button className={cn(
                "w-full py-1.5 rounded-lg text-xs font-semibold transition-colors",
                user.isFollowing
                  ? "bg-[var(--bg-muted)] text-[var(--text)] hover:bg-[var(--border)]"
                  : "bg-sky-500 text-white hover:bg-sky-600"
              )}>
                {user.isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tags section (when "tags" filter) */}
      {activeFilter === "tags" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {TAGS.map(tag => (
            <div key={tag.name} className="flex items-center gap-3 p-4 rounded-2xl border border-[var(--border)] hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-muted)] flex items-center justify-center flex-shrink-0">
                <Hash size={22} className="text-[var(--text-muted)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">#{tag.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{formatCount(tag.count)} posts</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trending section */}
      {(activeFilter === "all" || activeFilter === "photos") && (
        <>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={16} className="text-sky-500" />
            <h2 className="text-sm font-semibold text-[var(--text)]">Trending</h2>
          </div>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-3 gap-0.5 md:gap-1">
            {MOCK_EXPLORE_POSTS.map((post, i) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={cn(
                  "relative overflow-hidden bg-[var(--bg-muted)] group",
                  i % 7 === 0 ? "col-span-2 row-span-2" : ""
                )}
                style={{ aspectRatio: "1/1" }}
              >
                <Image
                  src={post.images[0]}
                  alt="explore"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                  <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                    <Heart size={18} className="fill-white" />
                    <span>{formatCount(post.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white font-semibold text-sm">
                    <MessageCircle size={18} className="fill-white" />
                    <span>{formatCount(post.comments)}</span>
                  </div>
                </div>
                {post.images.length > 1 && (
                  <div className="absolute top-2 right-2 bg-black/50 rounded-md px-1.5 py-0.5">
                    <span className="text-white text-[10px] font-bold">{post.images.length}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
