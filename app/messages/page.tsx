import MainLayout from "@/app/layout-main";
import MessagesClient from "./MessagesClient";

export default function MessagesPage() {
  return (
    <MainLayout>
      <MessagesClient />
    </MainLayout>
  );
}
