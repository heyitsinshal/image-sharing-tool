import { SignIn } from "@clerk/clerk-react";
import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <SignIn forceRedirectUrl="/images" />
    </div>
  );
};

export default Login;
