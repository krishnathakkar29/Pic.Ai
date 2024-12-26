import Image from "next/image";
import React from "react";
import loginImage from "../../../public/Abstract-Curves-and-Colors.jpeg";
import Logo from "@/components/Logo";
import AuthForm from "@/components/Auth/auth-form";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="min-h-screen grid grid-cols-2 relative">
      <div className="relative w-full flex flex-col text-primary-foreground bg-muted">
        <div className="w-full h-[30%] absolute z-10 bg-gradient-to-t from-transparent to-black/20 top-0 left-0 "></div>
        <div className="w-full h-[40%] absolute z-10 bg-gradient-to-b from-transparent to-black/20 bottom-0 left-0 "></div>
        <Image
          src={loginImage}
          alt="Login"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-5 left-5 z-20 flex items-center">
          <Logo />
        </div>
        <div className="absolute z-20 bottom-10 left-5">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Pic AI is a game changer for me. I have been able to
              generate high quality professional headshots within minutes. It
              has saved me countless hours of work and cost as well.&ldquo;
            </p>
            <footer>David S.</footer>
          </blockquote>
        </div>
      </div>
      <div className="relative flex flex-col items-center justify-center p-4 h-full w-full">
        <div className=" max-w-xl w-[350px] mx-auto">
          <AuthForm />
        </div>
      </div>
    </main>
  );
};

export default page;
