"use client";
import React, { useState } from "react";
import LoginForm from "./login-form";
import { Button } from "../ui/button";
import SignupForm from "./signup-form";
import ResetForm from "./reset-form";

type Props = {};

const AuthForm = (props: Props) => {
  const [mode, setMode] = useState("login");
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === "reset"
            ? "Reset password"
            : mode === "login"
            ? "Login"
            : "Sign up"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === "reset"
            ? "Reset password"
            : mode === "login"
            ? "Enter your email to login"
            : "Sign up"}
        </p>
      </div>
      <div>
        {mode === "login" && (
          <>
            <LoginForm />
            <div className="flex items-center justify-between p-0">
              <Button
                variant={"link"}
                onClick={() => setMode("signup")}
                className="p-0"
              >
                Need an account? Sign up
              </Button>
              <Button
                variant={"link"}
                onClick={() => setMode("reset")}
                className="p-0"
              >
                Forgot Password
              </Button>
            </div>
          </>
        )}
        {mode === "signup" && (
          <>
            <SignupForm />
            <div className="flex items-center justify-between p-0">
              <Button
                variant={"link"}
                onClick={() => setMode("login")}
                className="p-0"
              >
                Already have an account? Login
              </Button>
              <Button
                variant={"link"}
                onClick={() => setMode("reset")}
                className="p-0"
              >
                Forgot Password
              </Button>
            </div>
          </>
        )}
        {mode === "reset" && (
          <>
            <ResetForm />
            <div className="flex items-center justify-between p-0">
              <Button
                variant={"link"}
                onClick={() => setMode("login")}
                className="p-0"
              >
                Login
              </Button>
              <Button
                variant={"link"}
                onClick={() => setMode("signup")}
                className="p-0"
              >
                Need an account? Sign up
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
