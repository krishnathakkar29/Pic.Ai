"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { cn } from "@/lib/utils";
import { login } from "../../../actions/auth";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = { className?: string };

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter valid email",
  }),
  password: z.string().min(2, "Password should be minimum 6 characters"),
});

const LoginForm = ({ className }: Props) => {
  const [loading, setLoading] = useState(false);
  const toastId = useId();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const { success, error } = await login(formData);
    if (success) {
      toast.success("Login Successful", { id: toastId });
      setLoading(false);
      redirect("/dashboard");
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
