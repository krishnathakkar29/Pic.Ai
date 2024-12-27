"use client";
import React from "react";
import { logout as logoutAction } from "../../../actions/auth";

type Props = {};

const Logout = (props: Props) => {
  const logoutHandler = async () => {
    await logoutAction();
  };
  return (
    <span
      onClick={logoutHandler}
      className="inline-block w-full cursor-pointer text-destructive"
    >
      logout
    </span>
  );
};

export default Logout;
