"use client";
import { useState } from "react";
import Image from "next/image";
import {
  User, Lock, Bell, Eye, Moon, Sun, Smartphone,
  HelpCircle, Info, LogOut, ChevronRight, Camera, BadgeCheck,
  Globe, Heart, MessageCircle, UserPlus, Tag
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { User as UserType } from "@/types";

type SettingsSection = "main" | "account" | "privacy" | "notifications" | "appearance";

const SETTINGS_GROUPS = [
  {
    label: "Account",
    items: [
      { id: "account", icon: User, label: "Account", desc: "Personal info, username, email" },
      { id: "privacy", icon: Lock, label: "Privacy & Security", desc: "Account privacy, blocked users" },
      { id: "notifications", icon: Bell, label: "Notifications", desc: "Push, email, SMS preferences" },
      { id: "appearance", icon: Eye, label: "Appearance", desc: "Theme, display preferences" },
    ],
  },
  {
    label: "Support",
    items: [
      { id: "help", icon: HelpCircle, label: "Help Center", desc: "FAQs and support" },
      { id: "about", icon: Info, label: "About Pixora", desc: "Version 1.0.0" },
    ],
  },
];

function AccountSettings({ user }: { user: UserType }) {
  return (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 py-4">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
            <Image src={user.avatar} alt={user.username} width={96} height={96} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera size={20} className="text-white" />
          </div>
        </div>
        <button className="text-sm font-semibold text-sky-500 hover:text-sky-600">Change profile photo</button>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {[
          { label: "Name", value: user.displayName },
          { label: "Username", value: user.username },
          { label: "Bio", value: user.bio, multiline: true },
          { label: "Website", value: user.website || "" },
          { label: "Email", value: "you@pixora.app" },
          { label: "Phone", value: "+62 812 xxxx xxxx" },
        ].map(field => (
          <div key={field.label} className="border border-[var(--border)] rounded-xl overflow-hidden">
            <label className="block px-4 pt-3 pb-1 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide">
              {field.label}
            </label>
            {field.multiline ? (
              <textarea
                defaultValue={field.value}
                rows={3}
                className="w-full px-4 pb-3 bg-transparent text-sm text-[var(--text)] outline-none resize-none"
              />
            ) : (
              <input
                type="text"
                defaultValue={field.value}
                className="w-full px-4 pb-3 bg-transparent text-sm text-[var(--text)] outline-none"
              />
            )}
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl transition-colors">
        Save changes
      </button>
    </div>
  );
}

function PrivacySettings() {
  const [privateAccount, setPrivateAccount] = useState(false);
  const [activityStatus, setActivityStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);

  const Toggle = ({ value, onChange }: { value: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      className={cn(
        "relative w-11 h-6 rounded-full transition-colors duration-200",
        value ? "bg-sky-500" : "bg-[var(--bg-muted)]"
      )}
    >
      <div className={cn(
        "absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200",
        value ? "translate-x-5.5 left-0.5" : "left-0.5"
      )} style={{ transform: value ? "translateX(20px)" : "translateX(0)" }} />
    </button>
  );

  return (
    <div className="space-y-2">
      {[
        { label: "Private account", desc: "Only approved followers can see your posts", value: privateAccount, onChange: () => setPrivateAccount(v => !v) },
        { label: "Activity status", desc: "Show when you were last active", value: activityStatus, onChange: () => setActivityStatus(v => !v) },
        { label: "Read receipts", desc: "Let others know when you've read their messages", value: readReceipts, onChange: () => setReadReceipts(v => !v) },
      ].map(item => (
        <div key={item.label} className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)]">
          <div>
            <p className="text-sm font-medium text-[var(--text)]">{item.label}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
          </div>
          <Toggle value={item.value} onChange={item.onChange} />
        </div>
      ))}
      <div className="pt-2 space-y-1">
        {["Blocked accounts", "Muted accounts", "Restricted accounts"].map(item => (
          <button key={item} className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors border border-[var(--border)]">
            <span className="text-sm font-medium text-[var(--text)]">{item}</span>
            <ChevronRight size={16} className="text-[var(--text-muted)]" />
          </button>
        ))}
      </div>
    </div>
  );
}

function NotificationsSettings() {
  const notifGroups = [
    { icon: Heart, label: "Likes", desc: "When someone likes your post", enabled: true },
    { icon: MessageCircle, label: "Comments", desc: "When someone comments on your post", enabled: true },
    { icon: UserPlus, label: "New followers", desc: "When someone follows you", enabled: true },
    { icon: Tag, label: "Tags", desc: "When someone tags you in a post", enabled: false },
    { icon: Bell, label: "Direct messages", desc: "When you receive a direct message", enabled: true },
  ];
  const [states, setStates] = useState(notifGroups.map(g => g.enabled));

  return (
    <div className="space-y-2">
      {notifGroups.map((item, i) => (
        <div key={item.label} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)]">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
            states[i] ? "bg-sky-50 dark:bg-sky-950" : "bg-[var(--bg-muted)]"
          )}>
            <item.icon size={18} className={states[i] ? "text-sky-500" : "text-[var(--text-muted)]"} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-[var(--text)]">{item.label}</p>
            <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
          </div>
          <button
            onClick={() => setStates(s => s.map((v, j) => j === i ? !v : v))}
            className={cn(
              "relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0",
              states[i] ? "bg-sky-500" : "bg-[var(--bg-muted)]"
            )}
          >
            <div
              className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
              style={{ left: "2px", transform: states[i] ? "translateX(20px)" : "translateX(0)" }}
            />
          </button>
        </div>
      ))}
    </div>
  );
}

function AppearanceSettings() {
  const { theme, setTheme } = useAppStore();
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">Theme</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "light", icon: Sun, label: "Light" },
            { id: "dark", icon: Moon, label: "Dark" },
            { id: "system", icon: Smartphone, label: "System" },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => t.id !== "system" && setTheme(t.id as "light" | "dark")}
              className={cn(
                "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                (theme === t.id || (t.id === "system")) && theme === t.id
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-950"
                  : "border-[var(--border)] hover:bg-[var(--bg-subtle)]"
              )}
            >
              <t.icon size={22} className={theme === t.id ? "text-sky-500" : "text-[var(--text-muted)]"} />
              <span className={cn("text-sm font-medium", theme === t.id ? "text-sky-500" : "text-[var(--text-muted)]")}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">Font size</p>
        <div className="flex gap-2">
          {["small", "medium", "large"].map(size => (
            <button
              key={size}
              onClick={() => setFontSize(size)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-medium capitalize border-2 transition-all",
                fontSize === size
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-950 text-sky-500"
                  : "border-[var(--border)] text-[var(--text-muted)] hover:bg-[var(--bg-subtle)]"
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-3">Language</p>
        <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <Globe size={18} className="text-[var(--text-muted)]" />
            <span className="text-sm font-medium text-[var(--text)]">English (US)</span>
          </div>
          <ChevronRight size={16} className="text-[var(--text-muted)]" />
        </div>
      </div>
    </div>
  );
}

export default function SettingsClient() {
  const { currentUser } = useAppStore();
  const [section, setSection] = useState<SettingsSection>("main");

  const sectionTitles: Record<SettingsSection, string> = {
    main: "Settings",
    account: "Account",
    privacy: "Privacy & Security",
    notifications: "Notifications",
    appearance: "Appearance",
  };

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        {section !== "main" && (
          <button
            onClick={() => setSection("main")}
            className="text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 rounded-lg hover:bg-[var(--bg-muted)] transition-colors"
          >
            <ChevronRight size={20} className="rotate-180" />
          </button>
        )}
        <h1 className="text-xl font-semibold text-[var(--text)]">{sectionTitles[section]}</h1>
      </div>

      {section === "main" && (
        <div className="space-y-6">
          {/* User card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)]">
            <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-[var(--border)] flex-shrink-0">
              <Image src={currentUser.avatar} alt={currentUser.username} width={56} height={56} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-[var(--text)]">{currentUser.username}</p>
                {currentUser.isVerified && <BadgeCheck size={15} className="text-sky-500" />}
              </div>
              <p className="text-sm text-[var(--text-muted)]">{currentUser.displayName}</p>
            </div>
          </div>

          {SETTINGS_GROUPS.map(group => (
            <div key={group.label}>
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2 px-1">{group.label}</p>
              <div className="space-y-1">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSection(item.id as SettingsSection)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-subtle)] transition-colors border border-[var(--border)] group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[var(--bg-muted)] flex items-center justify-center flex-shrink-0">
                      <item.icon size={18} className="text-[var(--text-muted)]" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-[var(--text)]">{item.label}</p>
                      <p className="text-xs text-[var(--text-muted)]">{item.desc}</p>
                    </div>
                    <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Logout */}
          <button className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors border border-[var(--border)] text-red-500 group">
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-950/50 flex items-center justify-center flex-shrink-0">
              <LogOut size={18} className="text-red-500" />
            </div>
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      )}

      {section === "account" && <AccountSettings user={currentUser} />}
      {section === "privacy" && <PrivacySettings />}
      {section === "notifications" && <NotificationsSettings />}
      {section === "appearance" && <AppearanceSettings />}
    </div>
  );
}
