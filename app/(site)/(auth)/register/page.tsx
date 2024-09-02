import RegisterComponent from "@/components/custom/RegisterComponent";
import { authOptions } from "@/utils/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
  title: "Register",
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col gap-10 items-center justify-center h-[80vh]">
      <h1 className="text-4xl font-bold">Ad Campaign Manager</h1>
      <RegisterComponent />
    </div>
  );
}
