"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck, Settings, Grid3X3, Bookmark, Tag, Film,
  MapPin, Link as LinkIcon, Calendar, Heart, MessageCircle
} from "lucide-react";
import { MOCK_POSTS } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { formatCount } from "@/lib/data";
import { Post } from "@/types";
import { cn } from "@/lib/utils";

type ProfileTab = "posts" | "saved" | "tagged" | "reels";

export default function ProfileClient() {
  const { currentUser, posts, setSelectedPost } = useAppStore();
  const [tab, setTab] = useState<ProfileTab>("posts");

  const userPosts = posts.filter(p => p.author.id === currentUser.id);
  const savedPosts = posts.filter(p => p.isSaved);

  const tabs = [
    { id: "posts" as ProfileTab, icon: Grid3X3, label: "Posts" },
    { id: "reels" as ProfileTab, icon: Film, label: "Reels" },
    { id: "saved" as ProfileTab, icon: Bookmark, label: "Saved" },
    { id: "tagged" as ProfileTab, icon: Tag, label: "Tagged" },
  ];

  const displayPosts = tab === "saved" ? savedPosts : tab === "posts" ? userPosts : MOCK_POSTS.slice(0, 4);

  return (
    <div className="max-w-[935px] mx-auto px-4 py-8">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row gap-8 mb-10">
        {/* Avatar */}
        <div className="flex justify-center sm:justify-start flex-shrink-0">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-[3px] bg-gradient-story">
              <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg)] p-[3px]">
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  width={144}
                  height={144}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col gap-4">
          {/* Username row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-light text-[var(--text)]">{currentUser.username}</h1>
              {currentUser.isVerified && <BadgeCheck size={18} className="text-sky-500" />}
            </div>
            <div className="flex items-center gap-2">
              <button className="px-5 py-1.5 text-sm font-semibold border border-[var(--border)] rounded-xl hover:bg-[var(--bg-muted)] transition-colors text-[var(--text)]">
                Edit profile
              </button>
              <button className="px-5 py-1.5 text-sm font-semibold border border-[var(--border)] rounded-xl hover:bg-[var(--bg-muted)] transition-colors text-[var(--text)]">
                Share profile
              </button>
              <Link href="/settings">
                <Settings size={22} className="text-[var(--text)] hover:text-[var(--text-muted)] transition-colors" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { label: "posts", value: currentUser.postsCount },
              { label: "followers", value: currentUser.followers },
              { label: "following", value: currentUser.following },
            ].map(stat => (
              <div key={stat.label} className="text-center sm:text-left">
                <span className="text-base font-bold text-[var(--text)]">{formatCount(stat.value)}</span>
                <span className="text-sm text-[var(--text-muted)] ml-1.5">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <p className="text-sm font-semibold text-[var(--text)]">{currentUser.displayName}</p>
            <p className="text-sm text-[var(--text)] whitespace-pre-wrap leading-relaxed">{currentUser.bio}</p>
            {currentUser.location && (
              <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                <MapPin size={13} />
                <span>{currentUser.location}</span>
              </div>
            )}
            {currentUser.website && (
              <div className="flex items-center gap-1">
                <LinkIcon size={13} className="text-sky-500" />
                <a href={`https://${currentUser.website}`} className="text-sm text-sky-500 hover:underline font-medium">
                  {currentUser.website}
                </a>
              </div>
            )}
            {currentUser.joinedAt && (
              <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                <Calendar size={13} />
                <span>Joined {new Date(currentUser.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="flex gap-5 mb-8 overflow-x-auto no-scrollbar pb-2">
        {["Design", "Travel", "Tech", "Daily", "Food"].map((highlight, i) => (
          <div key={highlight} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
            <div className="w-16 h-16 rounded-full ring-2 ring-[var(--border)] overflow-hidden transition-transform group-hover:scale-105">
              <Image
                src={MOCK_POSTS[i % MOCK_POSTS.length]?.images[0] || ""}
                alt={highlight}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs text-[var(--text-muted)] font-medium">{highlight}</span>
          </div>
        ))}
        <div className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer group">
          <div className="w-16 h-16 rounded-full ring-2 ring-dashed ring-[var(--border)] flex items-center justify-center transition-transform group-hover:scale-105">
            <span className="text-2xl text-[var(--text-muted)]">+</span>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-medium">New</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-[var(--border)] mb-1">
        <div className="flex">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-widest transition-all border-t-2 -mt-px",
                tab === id
                  ? "border-[var(--text)] text-[var(--text)]"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text)]"
              )}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      {displayPosts.length > 0 ? (
        <div className="grid grid-cols-3 gap-0.5 md:gap-1">
          {displayPosts.map((post: Post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square overflow-hidden bg-[var(--bg-muted)] group"
            >
              <Image
                src={post.images[0]}
                alt="post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 33vw, 300px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-1 text-white font-semibold text-sm">
                  <Heart size={18} className="fill-white" />
                  <span>{formatCount(post.likes)}</span>
                </div>
                <div className="flex items-center gap-1 text-white font-semibold text-sm">
                  <MessageCircle size={18} className="fill-white" />
                  <span>{formatCount(post.comments)}</span>
                </div>
              </div>
              {post.images.length > 1 && (
                <div className="absolute top-2 right-2 bg-black/50 rounded px-1 py-0.5">
                  <span className="text-white text-[10px] font-bold">{post.images.length}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-[var(--text-muted)]">
          <Grid3X3 size={48} strokeWidth={1} />
          <p className="text-base font-medium">No posts yet</p>
          {tab === "posts" && <p className="text-sm">Share photos and they'll appear on your profile.</p>}
          {tab === "saved" && <p className="text-sm">Save photos to see them again here.</p>}
        </div>
      )}
    </div>
  );
}
