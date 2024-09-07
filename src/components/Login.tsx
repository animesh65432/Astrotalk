"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogInSchema } from "../Schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginTypes } from "../types";
import { Button } from "@/components/ui/button";
import { useLoginUser } from "../hooks";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const form = useForm<LoginTypes>({
    resolver: zodResolver(LogInSchema),
  });
  const router = useRouter();
  const [loading, logintheuser, errormessage] = useLoginUser();
  const { toast } = useToast();
  const onSubmit = async (data: LoginTypes) => {
    try {
      const result: boolean = await logintheuser(data);

      if (result) {
        toast({
          title: "Login Successfully",
          description: "You are now logged in",
        });
        router.push("/");
      } else {
        toast({
          title: "Login Failed",
          description: errormessage,
        });
      }
    } catch (error) {
      toast({
        title: "Error Something Went Wrong",
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-6 md:p-8 lg:p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Please enter your email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Please enter your password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
              type="submit"
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button>

          <div className="mt-4 text-center space-y-2">
            <Link
              href="/signup"
              className="block text-blue-500 hover:underline"
            >
              Don&apos;t have an account yet?
            </Link>
            <Link
              href="/ResetPassword"
              className="block text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
