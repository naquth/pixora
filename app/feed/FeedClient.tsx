"use client";
import StoriesBar from "@/components/stories/StoriesBar";
import PostCard from "@/components/post/PostCard";
import { useAppStore } from "@/lib/store";

export default function FeedClient() {
  const { posts } = useAppStore();

  return (
    <div>
      <StoriesBar />
      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
