import CrispProvider from "@/components/chatbot/CrispProvider";
import NavigationSidebar from "@/components/dashboard/NavigationSidebar";
import SidebarNav from "@/components/dashboard/SidebarNav";
import { Toaster } from "@/components/ui/toaster";
import { currentUser } from "@/lib/current-user";
import { redirectToSignIn } from "@clerk/nextjs";

const DashboardLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { UserId: string };
}) => {



  if (!params.UserId) {
     redirectToSignIn
  }

  return (
    <div className="flex items-start justify-between bg-[#ECEFFF] overflow-y-scroll md:h-screen h-max-screen">
      <div className="md:flex hidden items-center">
        <NavigationSidebar />
        <CrispProvider/>
      </div>
      <main className="w-full h-full">
        <SidebarNav />
        {children}
        <Toaster />
      </main>
    </div>
  );
};

export default DashboardLayout;
