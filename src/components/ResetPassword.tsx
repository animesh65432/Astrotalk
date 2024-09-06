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
          title: "Sent Email The Email",
          description: "Please Check Your Email",
        });
      } else {
        toast({
          title: "Errors",
          description: errormessage,
        });
      }
    } catch (error) {
      toast({
        title: "Something Went Wrong",
        description: "Plase try again  later",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Please enter your email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {isLoading ? "Loading ..." : "Reset PassWord"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPassword;
