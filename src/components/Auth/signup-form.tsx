"use client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signup } from "../../../actions/auth";
import { redirect } from "next/navigation";

type Props = { className?: string };

const signupFormSchema = z
  .object({
    fullName: z.string().min(2, "Must be atleast 2 characters long"),
    email: z.string().email({
      message: "Please enter valid email",
    }),
    password: z.string().min(2, "Password should be minimum 6 characters"),
    confirmPassword: z
      .string()
      .min(2, "Password should be minimum 6 characters"),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignupForm = ({ className }: Props) => {
  const [loading, setLoading] = useState(false);
  const toastId = useId();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("fullName", values.fullName);

    const { success, error } = await signup(formData);
    if (success) {
      toast.success("Signup Successful", { id: toastId });
      redirect("/login");
      setLoading(false);
    } else {
      toast.error(String(error), { id: toastId });
      setLoading(false);
    }

  }
  return (
    <div className={(cn("grid gap-6"), className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Full Name" {...field} />
                </FormControl>
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
                  <Input placeholder="example@gmail.com" {...field} />
                </FormControl>
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
                  <Input
                    placeholder="enter password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
