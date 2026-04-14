"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Heart, Send, BadgeCheck, MoreHorizontal, ChevronLeft, ChevronRight, MapPin, Smile } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { MOCK_COMMENTS } from "@/lib/data";
import { formatCount, timeAgo } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function PostModal() {
  const { selectedPost, setSelectedPost, toggleLike, currentUser } = useAppStore();
  const [imgIndex, setImgIndex] = useState(0);
  const [commentText, setCommentText] = useState("");

  if (!selectedPost) return null;
  const post = selectedPost;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in"
      onClick={() => setSelectedPost(null)}
    >
      <div
        className="bg-[var(--bg)] rounded-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Image side */}
        <div className="relative flex-1 bg-black aspect-square md:aspect-auto min-h-[300px]">
          <Image
            src={post.images[imgIndex]}
            alt="post"
            fill
            className="object-cover"
          />
          {post.images.length > 1 && (
            <>
              {imgIndex > 0 && (
                <button
                  onClick={() => setImgIndex(i => i - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronLeft size={18} />
                </button>
              )}
              {imgIndex < post.images.length - 1 && (
                <button
                  onClick={() => setImgIndex(i => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                >
                  <ChevronRight size={18} />
                </button>
              )}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                {post.images.map((_, i) => (
                  <div key={i} className={cn("rounded-full transition-all", i === imgIndex ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/60")} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Comment side */}
        <div className="w-full md:w-[380px] flex flex-col bg-[var(--bg)]">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <Link href="/profile" className="flex items-center gap-3" onClick={() => setSelectedPost(null)}>
              <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
                <Image src={post.author.avatar} alt={post.author.username} width={36} height={36} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-[var(--text)]">{post.author.username}</span>
                  {post.author.isVerified && <BadgeCheck size={13} className="text-sky-500" />}
                </div>
                {post.location && (
                  <div className="flex items-center gap-0.5">
                    <MapPin size={9} className="text-[var(--text-muted)]" />
                    <span className="text-[11px] text-[var(--text-muted)]">{post.location}</span>
                  </div>
                )}
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <button className="text-[var(--text-muted)] hover:text-[var(--text)]"><MoreHorizontal size={20} /></button>
              <button onClick={() => setSelectedPost(null)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Caption + Comments */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            {/* Caption */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--border)]">
                <Image src={post.author.avatar} alt={post.author.username} width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  <span className="font-semibold mr-1.5">{post.author.username}</span>
                  {post.caption}
                </p>
                <p className="text-[11px] text-[var(--text-muted)] mt-1">{timeAgo(post.createdAt)} ago</p>
              </div>
            </div>

            {/* Comments */}
            {MOCK_COMMENTS.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--border)]">
                  <Image src={comment.author.avatar} alt={comment.author.username} width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--text)] leading-relaxed">
                    <span className="font-semibold mr-1.5">{comment.author.username}</span>
                    {comment.text}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-[11px] text-[var(--text-muted)]">{timeAgo(comment.createdAt)} ago</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{comment.likes} likes</span>
                    <button className="text-[11px] text-[var(--text-muted)] font-semibold hover:text-[var(--text)]">Reply</button>
                  </div>
                  {/* Replies */}
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex gap-2 mt-3">
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={reply.author.avatar} alt={reply.author.username} width={24} height={24} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--text)]">
                          <span className="font-semibold mr-1.5">{reply.author.username}</span>
                          {reply.text}
                        </p>
                        <span className="text-[11px] text-[var(--text-muted)]">{timeAgo(reply.createdAt)} ago</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className={cn("text-[var(--text-muted)] hover:text-red-400 transition-colors mt-0.5", comment.isLiked && "text-red-500")}>
                  <Heart size={14} className={cn(comment.isLiked && "fill-red-500")} />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="border-t border-[var(--border)] px-4 pt-3">
            <div className="flex items-center gap-3 mb-2">
              <button onClick={() => toggleLike(post.id)} className={cn("transition-colors", post.isLiked ? "text-red-500" : "text-[var(--text)] hover:text-red-400")}>
                <Heart size={24} strokeWidth={1.8} className={cn(post.isLiked && "fill-red-500")} />
              </button>
              <button className="text-[var(--text)] hover:text-[var(--text-muted)]">
                <Send size={24} strokeWidth={1.8} />
              </button>
            </div>
            <p className="text-sm font-semibold text-[var(--text)] mb-0.5">{formatCount(post.likes)} likes</p>
            <p className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mb-3">{timeAgo(post.createdAt)} ago</p>
          </div>

          {/* Comment input */}
          <div className="border-t border-[var(--border)] px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
              <Image src={currentUser.avatar} alt="me" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <input
              type="text"
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              placeholder="Add a comment…"
              className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
            />
            <button className="text-[var(--text-muted)] hover:text-[var(--text)]"><Smile size={18} /></button>
            {commentText && (
              <button className="text-xs font-semibold text-sky-500 hover:text-sky-600">Post</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
