"use server";
import { createClient } from "@/lib/supabase/server";

interface AuthResponse {
  error: null | string;
  success: boolean;
  data: unknown | null;
}

export async function signup(formData: FormData): Promise<AuthResponse> {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        fullName: formData.get("fullName"),
      },
    },
  };
  const { data: signupData, error } = await supabase.auth.signUp(data);

  return {
    error: error?.message || "No Error",
    success: !error,
    data: signupData || null,
  };
}
