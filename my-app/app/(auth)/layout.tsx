import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col bg-[#FBDE4B] h-screen w-full items-center justify-between p-8 gap-8">
      <div className="flex flex-col justify-between gap-10">
        <h1 className="font-bold text-6xl text-center">
          Unlock Your Dashboard <br/>Sign Up Now!
          <br />
        </h1>
        <p className="text-xl text-center">
          Create Projects with ease & Keep track of your projects
          <br />
          And many more.
        </p>
      </div>
      
        <div className=" flex h-full w-full  justify-center">{children}</div>

    </div>
  );
};

export default AuthLayout;

