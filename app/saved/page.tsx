import MainLayout from "@/app/layout-main";
import SavedClient from "./SavedClient";
import PostModal from "@/components/post/PostModal";

export default function SavedPage() {
  return (
    <MainLayout>
      <SavedClient />
      <PostModal />
    </MainLayout>
  );
}
