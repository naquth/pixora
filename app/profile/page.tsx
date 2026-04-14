import MainLayout from "@/app/layout-main";
import ProfileClient from "./ProfileClient";
import PostModal from "@/components/post/PostModal";

export default function ProfilePage() {
  return (
    <MainLayout>
      <ProfileClient />
      <PostModal />
    </MainLayout>
  );
}
