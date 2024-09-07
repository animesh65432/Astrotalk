"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SingupSchema } from "../Schema";
import { Button } from "@/components/ui/button";
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
import { SingupTypes } from "../types";
import { useCreateUser } from "../hooks";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { signIn } from "next-auth/react";
const SingupPage: React.FC = () => {
  const form = useForm<SingupTypes>({
    resolver: zodResolver(SingupSchema),
  });
  const [loading, CreateUser, errormessage] = useCreateUser();
  const { toast } = useToast();
  const onSubmit = async (data: SingupTypes) => {
    try {
      const result: boolean = await CreateUser(data);

      if (result) {
        toast({
          title: "Singup Sucessfully",
          description: "Sucessyfully created your account",
        });
      } else {
        toast({
          title: "Singup Failed",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6 md:p-8 lg:p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Please enter your Username
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Please enter your Confirm Password
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
              {loading ? "Loading..." : "Sign up"}
            </Button>
          </form>
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button>
          <Link
            href="/login"
            className="block text-center text-blue-500 hover:underline mt-4"
          >
            Have an account? Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default SingupPage;
