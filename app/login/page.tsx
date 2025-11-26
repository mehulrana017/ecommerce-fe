"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { useAppContext } from "@/context/AppContext";

export default function LoginPage() {
  const { state } = useAppContext();
  const router = useRouter();

  // Redirect to homepage if already logged in
  useEffect(() => {
    if (state.currentUser) {
      router.push("/");
    }
  }, [state.currentUser, router]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex justify-center gap-2 mb-8">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
