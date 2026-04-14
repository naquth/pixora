"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, PlusSquare, Bell, User, Film } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/feed",          icon: Home,      label: "Home" },
  { href: "/explore",       icon: Compass,   label: "Explore" },
  { href: "/reels",         icon: Film,      label: "Reels" },
  { href: "/notifications", icon: Bell,      label: "Alerts" },
  { href: "/profile",       icon: User,      label: "Profile" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { setShowCreateModal, unreadCount } = useAppStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-[var(--border)] md:hidden pb-safe">
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {TABS.slice(0, 2).map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all",
              pathname === href ? "text-[var(--text)]" : "text-[var(--text-muted)]"
            )}
          >
            <Icon size={24} strokeWidth={pathname === href ? 2.2 : 1.8} />
            <span className="text-[9px] font-medium">{label}</span>
          </Link>
        ))}

        {/* Create button */}
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1.5"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-md shadow-sky-200 dark:shadow-sky-900">
            <PlusSquare size={20} className="text-white" strokeWidth={2} />
          </div>
        </button>

        {TABS.slice(2).map(({ href, icon: Icon, label }) => {
          const isBell = href === "/notifications";
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all",
                pathname === href ? "text-[var(--text)]" : "text-[var(--text-muted)]"
              )}
            >
              <div className="relative">
                <Icon size={24} strokeWidth={pathname === href ? 2.2 : 1.8} />
                {isBell && unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
