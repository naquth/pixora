export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  website?: string;
  followers: number;
  following: number;
  postsCount: number;
  isVerified: boolean;
  isFollowing: boolean;
  hasStory: boolean;
  storyViewed: boolean;
  isPrivate: boolean;
  location?: string;
  joinedAt: string;
}

export interface Post {
  id: string;
  author: User;
  images: string[];
  caption: string;
  likes: number;
  comments: number;
  saves: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  location?: string;
  createdAt: string;
  currentImageIndex?: number;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  likes: number;
  isLiked: boolean;
  replies: Comment[];
  createdAt: string;
}

export interface Story {
  id: string;
  author: User;
  media: string;
  type: "image" | "video";
  duration: number;
  views: number;
  createdAt: string;
  expiresAt: string;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "tag" | "share";
  actor: User;
  post?: Post;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface SearchResult {
  users: User[];
  posts: Post[];
  tags: { name: string; count: number }[];
}

export type Theme = "light" | "dark";
export type NavTab = "feed" | "explore" | "create" | "notifications" | "profile";
