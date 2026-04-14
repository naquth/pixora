import MainLayout from "@/app/layout-main";
import ExploreClient from "./ExploreClient";
import PostModal from "@/components/post/PostModal";

export default function ExplorePage() {
  return (
    <MainLayout>
      <ExploreClient />
      <PostModal />
    </MainLayout>
  );
}
