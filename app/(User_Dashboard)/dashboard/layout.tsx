import NavigationSidebar from "@/components/NavigationSidebar";
import { auth } from "@clerk/nextjs";


const DashboardLayout = async ({ children}: { children: React.ReactNode,params:{UserId:string} }) => {
  const {userId} = auth();

  if(!userId){
    return null
  }


  return (
   <div className="flex items-start justify-between bg-[#FBDE4B]">
      <NavigationSidebar/>
      <main className="w-full h-full">
        {children}
      </main>
   </div>
  );
};

export default DashboardLayout;
