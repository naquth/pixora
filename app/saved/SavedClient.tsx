"use client";
import Image from "next/image";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { formatCount } from "@/lib/data";

export default function SavedClient() {
  const { posts, setSelectedPost } = useAppStore();
  const saved = posts.filter(p => p.isSaved);

  return (
    <div className="max-w-[935px] mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <Bookmark size={24} className="text-[var(--text)]" />
        <h1 className="text-xl font-semibold text-[var(--text)]">Saved</h1>
        <span className="text-sm text-[var(--text-muted)] ml-auto">{saved.length} posts</span>
      </div>

      {saved.length > 0 ? (
        <div className="grid grid-cols-3 gap-0.5 md:gap-1">
          {saved.map(post => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square overflow-hidden bg-[var(--bg-muted)] group"
            >
              <Image
                src={post.images[0]}
                alt="saved"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="300px"
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
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-[var(--text-muted)]">
          <div className="w-20 h-20 rounded-full border-2 border-[var(--border)] flex items-center justify-center">
            <Bookmark size={36} strokeWidth={1.2} />
          </div>
          <div className="text-center">
            <p className="text-lg font-medium text-[var(--text)] mb-1">Save photos and videos</p>
            <p className="text-sm">Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
