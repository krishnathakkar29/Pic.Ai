import Image from "next/image";
import React from "react";
import loginImage from "../../../public/Abstract-Curves-and-Colors.jpeg";

type Props = {};

const page = (props: Props) => {
  return (
    <main className="min-h-screen grid grid-cols-2 relative">
      <div className="relative w-full flex flex-col text-foreground bg-muted">
        <Image
          src={loginImage}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
    </main>
  );
};

export default page;
