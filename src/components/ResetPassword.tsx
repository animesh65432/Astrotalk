"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "../Schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ResetPasswordTypes } from "../types";
import { useResetPassWord } from "../hooks";
import { useToast } from "@/hooks/use-toast";

const ResetPassword: React.FC = () => {
  const form = useForm<ResetPasswordTypes>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  const { toast } = useToast();
  const [isLoading, errormessage, ResetPassword] = useResetPassWord();

  const onSubmit = async (data: ResetPasswordTypes) => {
    try {
      let result: boolean = await ResetPassword(data);

      if (result) {
        toast({
          title: "Email Sent",
          description:
            "Please check your email for password reset instructions.",
        });
      } else {
        toast({
          title: "Error",
          description: errormessage,
        });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Please try again later.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Reset Password
        </h1>
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
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Please enter the email associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={`w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md ${
                isLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              type="submit"
            >
              {isLoading ? "Loading..." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
