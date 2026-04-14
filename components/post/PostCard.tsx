"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart, MessageCircle, Send, Bookmark,
  MoreHorizontal, BadgeCheck, MapPin, ChevronLeft, ChevronRight
} from "lucide-react";
import { Post } from "@/types";
import { useAppStore } from "@/lib/store";
import { formatCount, timeAgo } from "@/lib/data";
import { cn } from "@/lib/utils";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const { toggleLike, toggleSave, setSelectedPost } = useAppStore();
  const [imgIndex, setImgIndex] = useState(0);
  const [animLike, setAnimLike] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const handleLike = () => {
    toggleLike(post.id);
    if (!post.isLiked) {
      setAnimLike(true);
      setTimeout(() => setAnimLike(false), 400);
    }
  };

  const handleDoubleTap = () => {
    if (!post.isLiked) handleLike();
  };

  const caption = post.caption;
  const shortCaption = caption.length > 120 ? caption.slice(0, 120) + "…" : caption;

  return (
    <article className="bg-[var(--bg)] border-b border-[var(--border)] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/profile" className="flex items-center gap-3 group">
          <div className="relative">
            {post.author.hasStory ? (
              <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-story">
                <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg)] p-[1.5px]">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.username}
                    width={36}
                    height={36}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
                <Image
                  src={post.author.avatar}
                  alt={post.author.username}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-[var(--text)] group-hover:underline">
                {post.author.username}
              </span>
              {post.author.isVerified && (
                <BadgeCheck size={14} className="text-sky-500 flex-shrink-0" />
              )}
            </div>
            {post.location && (
              <div className="flex items-center gap-0.5">
                <MapPin size={10} className="text-[var(--text-muted)]" />
                <span className="text-[11px] text-[var(--text-muted)]">{post.location}</span>
              </div>
            )}
          </div>
        </Link>
        <button className="text-[var(--text-muted)] hover:text-[var(--text)] p-1 rounded-lg hover:bg-[var(--bg-muted)] transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-square bg-[var(--bg-muted)] overflow-hidden" onDoubleClick={handleDoubleTap}>
        <Image
          src={post.images[imgIndex]}
          alt="post"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />

        {/* Multi-image dots */}
        {post.images.length > 1 && (
          <>
            {imgIndex > 0 && (
              <button
                onClick={() => setImgIndex(i => i - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
            )}
            {imgIndex < post.images.length - 1 && (
              <button
                onClick={() => setImgIndex(i => i + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            )}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {post.images.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "rounded-full transition-all",
                    i === imgIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Double tap heart animation */}
        {animLike && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Heart
              size={80}
              className="text-white fill-white animate-heart-pop drop-shadow-xl"
            />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className={cn(
                "p-2 -ml-2 rounded-full transition-colors",
                post.isLiked ? "text-red-500" : "text-[var(--text)] hover:text-red-400"
              )}
            >
              <Heart
                size={24}
                strokeWidth={1.8}
                className={cn("transition-all duration-200", post.isLiked && "fill-red-500")}
              />
            </button>
            <button
              onClick={() => setSelectedPost(post)}
              className="p-2 rounded-full text-[var(--text)] hover:text-[var(--text-muted)] transition-colors"
            >
              <MessageCircle size={24} strokeWidth={1.8} />
            </button>
            <button className="p-2 rounded-full text-[var(--text)] hover:text-[var(--text-muted)] transition-colors">
              <Send size={24} strokeWidth={1.8} />
            </button>
          </div>
          <button
            onClick={() => toggleSave(post.id)}
            className={cn(
              "p-2 -mr-2 rounded-full transition-colors",
              post.isSaved ? "text-[var(--text)]" : "text-[var(--text)] hover:text-[var(--text-muted)]"
            )}
          >
            <Bookmark
              size={24}
              strokeWidth={1.8}
              className={cn("transition-all duration-200", post.isSaved && "fill-current")}
            />
          </button>
        </div>

        {/* Likes */}
        <p className="text-sm font-semibold text-[var(--text)] mb-1.5">
          {formatCount(post.likes)} likes
        </p>

        {/* Caption */}
        <p className="text-sm text-[var(--text)] leading-relaxed mb-1">
          <Link href="/profile" className="font-semibold mr-1.5 hover:underline">
            {post.author.username}
          </Link>
          {showFullCaption ? caption : shortCaption}
          {caption.length > 120 && (
            <button
              onClick={() => setShowFullCaption(v => !v)}
              className="text-[var(--text-muted)] ml-1 hover:text-[var(--text)] transition-colors"
            >
              {showFullCaption ? "less" : "more"}
            </button>
          )}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {post.tags.slice(0, 4).map(tag => (
              <Link
                key={tag}
                href={`/explore?tag=${tag}`}
                className="text-xs text-sky-500 hover:text-sky-600 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Comments */}
        <button
          onClick={() => setSelectedPost(post)}
          className="text-sm text-[var(--text-muted)] hover:text-[var(--text)] transition-colors mb-1"
        >
          View all {formatCount(post.comments)} comments
        </button>

        {/* Timestamp */}
        <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide">
          {timeAgo(post.createdAt)} ago
        </p>
      </div>

      {/* Add comment */}
      <div className="px-4 py-3 flex items-center gap-3 border-t border-[var(--border)] mt-1">
        <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-[var(--bg-muted)]">
          <Image
            src="https://api.dicebear.com/9.x/notionists/svg?seed=me&backgroundColor=b6e3f4"
            alt="me"
            width={28}
            height={28}
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="text"
          placeholder="Add a comment…"
          className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none py-1"
        />
        <button className="text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors">
          Post
        </button>
      </div>
    </article>
  );
}
