"use client";
import Image from "next/image";
import { Heart, MessageCircle, UserPlus, AtSign, Tag, Share2, Check, Bookmark } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { timeAgo } from "@/lib/data";
import { Notification } from "@/types";
import { cn } from "@/lib/utils";

const iconMap = {
  like: { icon: Heart, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950" },
  comment: { icon: MessageCircle, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-950" },
  follow: { icon: UserPlus, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950" },
  mention: { icon: AtSign, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950" },
  tag: { icon: Tag, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950" },
  share: { icon: Share2, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950" },
  save: { icon: Bookmark, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950" },
};

function NotifItem({ notif }: { notif: Notification }) {
  const config = iconMap[notif.type] || iconMap.like;
  const Icon = config.icon;

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-subtle)] transition-colors cursor-pointer",
      !notif.isRead && "bg-sky-50/50 dark:bg-sky-950/20"
    )}>
      {/* Avatar with icon badge */}
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
          <Image
            src={notif.actor.avatar}
            alt={notif.actor.username}
            width={44}
            height={44}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={cn("absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center", config.bg)}>
          <Icon size={10} className={cn("fill-current", config.color)} />
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[var(--text)] leading-relaxed">
          <span className="font-semibold">{notif.actor.username}</span>
          {" "}{notif.message}
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-0.5">{timeAgo(notif.createdAt)} ago</p>
      </div>

      {/* Post thumbnail or follow button */}
      <div className="flex-shrink-0">
        {notif.post ? (
          <div className="w-11 h-11 rounded-lg overflow-hidden bg-[var(--bg-muted)]">
            <Image
              src={notif.post.images[0]}
              alt="post"
              width={44}
              height={44}
              className="w-full h-full object-cover"
            />
          </div>
        ) : notif.type === "follow" ? (
          <button className="px-4 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg transition-colors">
            Follow
          </button>
        ) : (
          !notif.isRead && <div className="w-2 h-2 rounded-full bg-sky-500" />
        )}
      </div>
    </div>
  );
}

export default function NotificationsClient() {
  const { notifications, markAllRead, unreadCount } = useAppStore();
  const today = notifications.filter(n => !n.isRead);
  const earlier = notifications.filter(n => n.isRead);

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-[var(--border)] px-4 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-[var(--text)]">Notifications</h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors"
          >
            <Check size={14} />
            Mark all read
          </button>
        )}
      </div>

      {today.length > 0 && (
        <div>
          <div className="px-4 py-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              New · {unreadCount}
            </span>
          </div>
          {today.map(n => <NotifItem key={n.id} notif={n} />)}
        </div>
      )}

      {earlier.length > 0 && (
        <div>
          <div className="px-4 py-3 border-t border-[var(--border)]">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Earlier</span>
          </div>
          {earlier.map(n => <NotifItem key={n.id} notif={n} />)}
        </div>
      )}

      {notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3 text-[var(--text-muted)]">
          <Heart size={48} strokeWidth={1} />
          <p className="text-base font-medium">No notifications yet</p>
          <p className="text-sm">When someone likes or comments on your posts, you'll see it here.</p>
        </div>
      )}
    </div>
  );
}
