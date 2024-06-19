"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import Navigation from "@/pages/Navigation";
import Loading from "@/components/Loading";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth({
    middleware: "auth",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (!user && !isLoading) {
      router.push("/login");
    }

    return () => clearTimeout(loadingTimer);
  }, [user, isLoading, router]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navigation user={user} />
      <div className="container mx-auto py-16">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-2">
          <LeftSidebar />
          <div
            id="main-content"
            className="w-full min-h-screen lg:col-span-8 xl:col-span-6"
          >
            {children}
          </div>
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
