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

const LoginPage: React.FC = () => {
  const form = useForm<LoginTypes>({
    resolver: zodResolver(LogInSchema),
  });
  const [loading, logintheuser, errormessage] = useLoginUser();
  console.log(errormessage);
  const { toast } = useToast();
  const onSubmit = async (data: LoginTypes) => {
    try {
      let result: boolean = await logintheuser(data);

      if (result) {
        toast({
          title: "Login Sucessfully",
          description: "you are now logged in",
        });
      } else {
        toast({
          title: "login Failed",
          description: errormessage,
        });
      }
    } catch (error) {
      toast({
        title: "Eroor Something Went Wrong",
        description: "Please try again later",
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription>Please enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{loading ? "Loading..." : "Login"}</Button>

          <Button onClick={() => signIn("google")}>log with google</Button>
        </form>
        <Link href="/signup">Don't have an account yet ?</Link>
        <Link href="/ResetPassword">forget your password</Link>
      </Form>
    </div>
  );
};

export default LoginPage;
