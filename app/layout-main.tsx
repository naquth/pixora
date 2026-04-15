import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import ThemeProvider from "@/components/layout/ThemeProvider";
import CreatePostModal from "@/components/post/CreatePostModal";
import StoryViewer from "@/components/stories/StoryViewer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg)]">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="md:ml-[72px] xl:ml-[240px] min-h-screen pb-20 md:pb-0 transition-all duration-300">
          {children}
        </main>

        {/* Mobile Nav */}
        <MobileNav />

        {/* Modals */}
        <CreatePostModal />
        <StoryViewer />
      </div>
    </ThemeProvider>
  );
}
