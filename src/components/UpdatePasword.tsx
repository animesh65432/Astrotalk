"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePasswordSchema } from "../Schema";
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
import { UpdatePasswordTypes } from "../types";
import { useUpdatePassword } from "../hooks";
import { useToast } from "@/hooks/use-toast";
type Props = {
  id: string;
};
const UpdatePasword: React.FC<Props> = ({ id }) => {
  const form = useForm<UpdatePasswordTypes>({
    resolver: zodResolver(UpdatePasswordSchema),
  });
  const [isLoading, errormessage, UpdatePassword] = useUpdatePassword();
  const { toast } = useToast();
  console.log(errormessage);

  const onSubmit = async (data: UpdatePasswordTypes) => {
    try {
      let result = await UpdatePassword({ id, password: data.password });

      if (result) {
        toast({
          title: "Password Update",
          description: "Now you can login with the new password",
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
        description: "Plase try again later",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>Please enter your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormDescription>Please confirm your password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{isLoading ? "Laoding..." : "Update"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasword;
