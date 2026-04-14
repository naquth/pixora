"use client";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark, Volume2, VolumeX, MoreHorizontal, Music2, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { MOCK_POSTS, formatCount } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function ReelsClient() {
  const [muted, setMuted] = useState(true);
  const [currentReel, setCurrentReel] = useState(0);
  const { toggleLike, posts } = useAppStore();

  return (
    <div className="max-w-[470px] mx-auto h-screen overflow-y-auto no-scrollbar snap-y snap-mandatory">
      {MOCK_POSTS.map((post, i) => (
        <div
          key={post.id}
          className="relative h-screen snap-start snap-always flex items-center justify-center bg-black"
          onMouseEnter={() => setCurrentReel(i)}
        >
          {/* Reel image (simulating video) */}
          <Image
            src={post.images[0]}
            alt="reel"
            fill
            className="object-cover"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/20">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: currentReel === i ? "60%" : "0%" }}
            />
          </div>

          {/* Top controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="text-white font-semibold text-lg">Reels</span>
            <button onClick={() => setMuted(m => !m)} className="text-white">
              {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
          </div>

          {/* Right actions */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-5 z-10">
            <button
              onClick={() => toggleLike(post.id)}
              className="flex flex-col items-center gap-1"
            >
              <Heart
                size={28}
                strokeWidth={1.8}
                className={cn("text-white transition-all", post.isLiked && "fill-red-500 text-red-500")}
              />
              <span className="text-white text-xs font-semibold">{formatCount(post.likes)}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <MessageCircle size={28} strokeWidth={1.8} className="text-white" />
              <span className="text-white text-xs font-semibold">{formatCount(post.comments)}</span>
            </button>
            <button className="flex flex-col items-center gap-1">
              <Send size={28} strokeWidth={1.8} className="text-white" />
              <span className="text-white text-xs font-semibold">{formatCount(post.shares)}</span>
            </button>
            <button>
              <Bookmark size={28} strokeWidth={1.8} className="text-white" />
            </button>
            <button>
              <MoreHorizontal size={28} strokeWidth={1.8} className="text-white" />
            </button>
            {/* Rotating disc */}
            <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white animate-spin" style={{ animationDuration: "3s" }}>
              <Image src={post.author.avatar} alt="audio" width={40} height={40} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bottom info */}
          <div className="absolute left-4 right-16 bottom-8 z-10">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-white">
                <Image src={post.author.avatar} alt={post.author.username} width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-sm">{post.author.username}</span>
                {post.author.isVerified && <BadgeCheck size={13} className="text-sky-400" />}
              </div>
              <button className="ml-1 px-3 py-0.5 border border-white/70 rounded-full text-white text-xs font-semibold hover:bg-white/10 transition-colors">
                Follow
              </button>
            </div>
            <p className="text-white text-sm leading-relaxed line-clamp-2 mb-2">{post.caption}</p>
            <div className="flex items-center gap-1.5 text-white text-xs">
              <Music2 size={12} />
              <span className="truncate">Original audio · {post.author.username}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
