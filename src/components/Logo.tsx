import { Sparkles } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href="/" className="flex items-center gap-3">
      <Sparkles className="size-8" strokeWidth={1.5} />
      <span className="text-lg font-semibold">Pic AI</span>
    </Link>
  );
};

export default Logo;
