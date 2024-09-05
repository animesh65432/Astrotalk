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
const SingupPage: React.FC = () => {
  const form = useForm<SingupTypes>({
    resolver: zodResolver(SingupSchema),
  });
  const [loading, CreateUser, errormessage] = useCreateUser();
  const { toast } = useToast();
  const onSubmit = async (data: any) => {
    try {
      let result: boolean = await CreateUser(data);

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormDescription>Plase enter your Username</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Plase enter your email</FormDescription>
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
                <FormDescription>Plase enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ConfirmPassword</FormLabel>
                <FormControl>
                  <Input placeholder="Confirmpassword" {...field} />
                </FormControl>
                <FormDescription>
                  Plase enter your Confirmpassword
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{loading ? "Loading ..." : "Singup"}</Button>
        </form>
        <Link href="/login">Have an account ? Login</Link>
      </Form>
    </div>
  );
};

export default SingupPage;
