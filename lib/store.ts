"use client";
import { create } from "zustand";
import { Post, User, Notification, Theme } from "@/types";
import { MOCK_POSTS, MOCK_NOTIFICATIONS, MOCK_USERS } from "@/lib/data";

interface AppState {
  // Auth
  currentUser: User;
  isAuthenticated: boolean;
  
  // Posts
  posts: Post[];
  explorePosts: Post[];
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // UI
  theme: Theme;
  activeTab: string;
  showCreateModal: boolean;
  showStoryViewer: boolean;
  storyViewerIndex: number;
  selectedPost: Post | null;
  
  // Actions
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  toggleFollow: (userId: string) => void;
  markAllRead: () => void;
  setTheme: (theme: Theme) => void;
  setActiveTab: (tab: string) => void;
  setShowCreateModal: (show: boolean) => void;
  setShowStoryViewer: (show: boolean, index?: number) => void;
  setSelectedPost: (post: Post | null) => void;
  addPost: (post: Post) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: MOCK_USERS[0],
  isAuthenticated: true,
  posts: MOCK_POSTS,
  explorePosts: MOCK_POSTS,
  notifications: MOCK_NOTIFICATIONS,
  unreadCount: MOCK_NOTIFICATIONS.filter(n => !n.isRead).length,
  theme: "light",
  activeTab: "feed",
  showCreateModal: false,
  showStoryViewer: false,
  storyViewerIndex: 0,
  selectedPost: null,

  toggleLike: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 }
          : p
      ),
    })),

  toggleSave: (postId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === postId ? { ...p, isSaved: !p.isSaved } : p
      ),
    })),

  toggleFollow: (userId) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.author.id === userId
          ? { ...p, author: { ...p.author, isFollowing: !p.author.isFollowing } }
          : p
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),

  setTheme: (theme) => set({ theme }),
  setActiveTab: (activeTab) => set({ activeTab }),
  setShowCreateModal: (showCreateModal) => set({ showCreateModal }),
  setShowStoryViewer: (show, index = 0) =>
    set({ showStoryViewer: show, storyViewerIndex: index }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),

  addPost: (post) =>
    set((state) => ({ posts: [post, ...state.posts] })),
}));
