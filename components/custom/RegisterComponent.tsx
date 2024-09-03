"use client";

import { Button } from "@/components/common/button";
import {
  Card,
  CardContent,
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
import axios, { AxiosError } from "axios";

export default function RegisterComponent() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const name = form.firstname.value;
    const email = form.email.value;
    const password = form.password.value;

    if(password.length < 6){
      setLoading(false);
      return toast.error("Password must be at least 6 characters long", {position: "bottom-center"});
    }

    try {
      const response = await axios.post("/api/register", {
        name: name,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setLoading(false);
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          setLoading(false);
          return toast.error(
            (error.response?.data as { message: string })?.message
          );
        }
      }
      toast.error("Something went wrong. Please try again");
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold">
            Register
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="firstname" placeholder="Robin" required />
            </div>
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
              {/* add eye button to reveal the password */}

              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-gray-500 focus:outline-none"
                >
                  {passwordVisible ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            {loading ? (
              <Loader className="animate-spin w-full" size={24} />
            ) : (
              <Button type="submit" className="w-full">
                Create an account
              </Button>
            )}
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
