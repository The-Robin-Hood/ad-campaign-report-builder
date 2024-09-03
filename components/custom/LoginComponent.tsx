"use client";

import { Button } from "@/components/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/common/card";
import { Input } from "@/components/common/input";
import { Label } from "@/components/common/label";
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    signIn("credentials", { email, password, redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error(callback?.error);
          setLoading(false);
          return;
        }
        if (callback?.ok && !callback?.error) {
          toast.success("Login successful");
          setLoading(false);
          router.push("/");
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="robin@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="********"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
              >
                {passwordVisible ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3">
          {loading ? (
            <Loader className="animate-spin" size={24} />
          ) : (
            <>
              <Button className="w-full" type="submit">
                Sign in
              </Button>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                  Register
                </Link>
              </div>
            </>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}
