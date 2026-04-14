"use client";
import { useState } from "react";
import Image from "next/image";
import { Search, Edit, Send, Smile, Image as ImageIcon, Heart, MoreHorizontal, Phone, Video, Info, BadgeCheck, ArrowLeft } from "lucide-react";
import { MOCK_USERS, timeAgo } from "@/lib/data";
import { useAppStore } from "@/lib/store";
import { User } from "@/types";
import { cn } from "@/lib/utils";

const MOCK_MESSAGES = [
  { id: "1", userId: "2", lastMessage: "Love this shot! 🔥", time: new Date(Date.now() - 1000 * 60 * 5).toISOString(), unread: 2 },
  { id: "2", userId: "3", lastMessage: "Thanks for the follow!", time: new Date(Date.now() - 1000 * 60 * 60).toISOString(), unread: 0 },
  { id: "3", userId: "4", lastMessage: "Check out my new post 🌍", time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), unread: 1 },
  { id: "4", userId: "5", lastMessage: "Did you see that React release?", time: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), unread: 0 },
  { id: "5", userId: "6", lastMessage: "Your commission is ready!", time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), unread: 0 },
];

const CHAT_MESSAGES = [
  { id: "cm1", senderId: "2", text: "Hey! Love your photography style!", time: new Date(Date.now() - 1000 * 60 * 30).toISOString() },
  { id: "cm2", senderId: "1", text: "Thank you so much! That means a lot 🙏", time: new Date(Date.now() - 1000 * 60 * 28).toISOString() },
  { id: "cm3", senderId: "2", text: "How long have you been shooting?", time: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
  { id: "cm4", senderId: "1", text: "About 3 years now. Started as a hobby and just fell in love with it!", time: new Date(Date.now() - 1000 * 60 * 22).toISOString() },
  { id: "cm5", senderId: "2", text: "Love this shot! 🔥", time: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
];

export default function MessagesClient() {
  const { currentUser } = useAppStore();
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [showChat, setShowChat] = useState(false);

  const selectedUser = selectedConv
    ? MOCK_USERS.find(u => u.id === MOCK_MESSAGES.find(m => m.id === selectedConv)?.userId)
    : null;

  const handleSelectConv = (id: string) => {
    setSelectedConv(id);
    setShowChat(true);
  };

  return (
    <div className="h-screen flex max-w-[935px] mx-auto border-x border-[var(--border)]">
      {/* Inbox list */}
      <div className={cn(
        "w-full md:w-[350px] border-r border-[var(--border)] flex flex-col flex-shrink-0",
        showChat && "hidden md:flex"
      )}>
        {/* Header */}
        <div className="px-4 py-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-[var(--text)]">{currentUser.username}</span>
            <button className="text-[var(--text)] hover:text-[var(--text-muted)]"><Edit size={22} strokeWidth={1.8} /></button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-9 pr-4 py-2.5 bg-[var(--bg-muted)] rounded-xl text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {MOCK_MESSAGES.map(conv => {
            const user = MOCK_USERS.find(u => u.id === conv.userId);
            if (!user) return null;
            return (
              <button
                key={conv.id}
                onClick={() => handleSelectConv(conv.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-subtle)] transition-colors",
                  selectedConv === conv.id && "bg-[var(--bg-muted)]"
                )}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
                    <Image src={user.avatar} alt={user.username} width={48} height={48} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[var(--bg)]" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-sm font-semibold text-[var(--text)] truncate">{user.username}</span>
                    {user.isVerified && <BadgeCheck size={12} className="text-sky-500 flex-shrink-0" />}
                  </div>
                  <p className={cn("text-xs truncate", conv.unread > 0 ? "text-[var(--text)] font-medium" : "text-[var(--text-muted)]")}>
                    {conv.lastMessage}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-[10px] text-[var(--text-muted)]">{timeAgo(conv.time)}</span>
                  {conv.unread > 0 && (
                    <span className="w-4 h-4 bg-sky-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      <div className={cn(
        "flex-1 flex flex-col",
        !showChat && "hidden md:flex"
      )}>
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <button onClick={() => setShowChat(false)} className="md:hidden text-[var(--text)] mr-1">
                <ArrowLeft size={20} />
              </button>
              <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[var(--border)]">
                <Image src={selectedUser.avatar} alt={selectedUser.username} width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-[var(--text)]">{selectedUser.username}</span>
                  {selectedUser.isVerified && <BadgeCheck size={13} className="text-sky-500" />}
                </div>
                <p className="text-xs text-green-500 font-medium">Active now</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-[var(--text)] hover:text-[var(--text-muted)]"><Phone size={20} strokeWidth={1.8} /></button>
                <button className="text-[var(--text)] hover:text-[var(--text-muted)]"><Video size={20} strokeWidth={1.8} /></button>
                <button className="text-[var(--text)] hover:text-[var(--text-muted)]"><Info size={20} strokeWidth={1.8} /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {CHAT_MESSAGES.map(msg => {
                const isMe = msg.senderId === "1";
                return (
                  <div key={msg.id} className={cn("flex items-end gap-2", isMe ? "justify-end" : "justify-start")}>
                    {!isMe && (
                      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                        <Image src={selectedUser.avatar} alt={selectedUser.username} width={28} height={28} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className={cn(
                      "max-w-[70%] px-4 py-2.5 rounded-2xl text-sm",
                      isMe
                        ? "bg-sky-500 text-white rounded-br-sm"
                        : "bg-[var(--bg-muted)] text-[var(--text)] rounded-bl-sm"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-3">
              <button className="text-[var(--text-muted)] hover:text-[var(--text)]"><Smile size={20} /></button>
              <div className="flex-1 flex items-center gap-2 bg-[var(--bg-muted)] rounded-full px-4 py-2.5">
                <input
                  type="text"
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  placeholder="Message…"
                  className="flex-1 bg-transparent text-sm text-[var(--text)] placeholder-[var(--text-muted)] outline-none"
                  onKeyDown={e => e.key === "Enter" && setMessageText("")}
                />
              </div>
              <button className="text-[var(--text-muted)] hover:text-[var(--text)]"><ImageIcon size={20} /></button>
              <button className="text-[var(--text-muted)] hover:text-[var(--text)]"><Heart size={20} /></button>
              {messageText ? (
                <button
                  onClick={() => setMessageText("")}
                  className="text-sky-500 hover:text-sky-600"
                >
                  <Send size={20} />
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-[var(--text-muted)]">
            <div className="w-20 h-20 rounded-full border-2 border-[var(--border)] flex items-center justify-center">
              <Send size={32} strokeWidth={1.2} />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-[var(--text)] mb-1">Your messages</p>
              <p className="text-sm">Send private photos and messages to a friend or group.</p>
            </div>
            <button className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors">
              Send message
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
