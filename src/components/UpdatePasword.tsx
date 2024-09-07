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

  const onSubmit = async (data: UpdatePasswordTypes) => {
    try {
      const result = await UpdatePassword({ id, password: data.password });

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
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8 lg:p-10 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          Update Password
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
                      placeholder="Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Please enter your new password
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
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    Please confirm your password
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
              {isLoading ? "Loading..." : "Update"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePasword;
