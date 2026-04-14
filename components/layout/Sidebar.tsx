"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home, Compass, PlusSquare, Bell, User, Search,
  Settings, Moon, Sun, LogOut, MessageCircle, Bookmark, Film
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/feed",          icon: Home,          label: "Home" },
  { href: "/explore",       icon: Compass,       label: "Explore" },
  { href: "/reels",         icon: Film,          label: "Reels" },
  { href: "/messages",      icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell,          label: "Notifications" },
  { href: "/saved",         icon: Bookmark,      label: "Saved" },
  { href: "/profile",       icon: User,          label: "Profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, setShowCreateModal, currentUser, unreadCount } = useAppStore();

  return (
    <aside className="fixed left-0 top-0 h-full z-40 flex flex-col w-[72px] xl:w-[240px] border-r border-[var(--border)] bg-[var(--bg)] transition-all duration-300">
      {/* Logo */}
      <div className="px-3 xl:px-6 py-8">
        <Link href="/feed" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-sky-200 dark:shadow-sky-900">
            <span className="text-white font-bold text-sm">Px</span>
          </div>
          <span className="hidden xl:block font-display text-xl font-bold tracking-tight text-[var(--text)]">
            Pixora
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2 xl:px-4 space-y-1">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          const isBell = href === "/notifications";
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3.5 px-3 py-2.5 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[var(--bg-muted)] text-[var(--text)] font-semibold"
                  : "text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)]"
              )}
            >
              <div className="relative flex-shrink-0">
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.8}
                  className={cn(
                    "transition-transform duration-200",
                    !isActive && "group-hover:scale-110"
                  )}
                />
                {isBell && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:block text-sm">{label}</span>
            </Link>
          );
        })}

        {/* Create button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full group flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)] transition-all duration-200"
        >
          <PlusSquare size={22} strokeWidth={1.8} className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
          <span className="hidden xl:block text-sm">Create</span>
        </button>
      </nav>

      {/* Bottom controls */}
      <div className="px-2 xl:px-4 pb-6 space-y-1">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)] transition-all duration-200 group"
        >
          {theme === "light" ? (
            <Moon size={22} strokeWidth={1.8} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
          ) : (
            <Sun size={22} strokeWidth={1.8} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
          )}
          <span className="hidden xl:block text-sm">{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>

        <Link
          href="/settings"
          className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:bg-[var(--bg-subtle)] hover:text-[var(--text)] transition-all duration-200 group"
        >
          <Settings size={22} strokeWidth={1.8} className="flex-shrink-0 group-hover:rotate-45 transition-transform duration-300" />
          <span className="hidden xl:block text-sm">Settings</span>
        </Link>

        {/* User */}
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--bg-subtle)] transition-all duration-200 mt-2"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--border)]">
            <Image
              src={currentUser.avatar}
              alt={currentUser.username}
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden xl:block min-w-0">
            <p className="text-xs font-semibold text-[var(--text)] truncate">{currentUser.displayName}</p>
            <p className="text-xs text-[var(--text-muted)] truncate">@{currentUser.username}</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
