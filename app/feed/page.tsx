import MainLayout from "@/app/layout-main";
import StoriesBar from "@/components/stories/StoriesBar";
import PostCard from "@/components/post/PostCard";
import PostModal from "@/components/post/PostModal";
import SuggestionsSidebar from "@/components/shared/SuggestionsSidebar";
import FeedClient from "./FeedClient";

export default function FeedPage() {
  return (
    <MainLayout>
      <div className="flex max-w-[975px] mx-auto">
        {/* Feed column */}
        <div className="flex-1 max-w-[600px] w-full">
          <FeedClient />
        </div>
        {/* Suggestions */}
        <SuggestionsSidebar />
      </div>
      <PostModal />
    </MainLayout>
  );
}
