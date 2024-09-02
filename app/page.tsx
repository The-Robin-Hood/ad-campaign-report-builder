"use client";

import PreLoader from "@/components/common/preloader";
import { Metadata } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const metadata: Metadata = {
  title: "Ad Campaign Dashboard",
  description: "Simple Ad Campaign Dashboard",
};

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  async function checkSession() {
    const session = await getSession();
    if (session) {
      router.push("/dashboard");
    } else {
      setLoading(false);
      router.push("/login");
    }
  }
  useEffect(() => {
    checkSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="z-50 flex h-screen items-center justify-center">
        <PreLoader />
      </div>
    );
  }

  return <main></main>;
}
