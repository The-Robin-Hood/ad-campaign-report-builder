import Header from "@/components/custom/Header";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import DashboardComponent from "@/components/custom/DashBoardComponent";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header session={session} />
      <DashboardComponent />
    </div>
  );
}
