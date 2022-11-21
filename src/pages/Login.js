import Button from "components/button/Button";
import React from "react";

const Login = () => {
  return (
    <div className="page-container lg:w-screen  h-[600px] flex items-center justify-center ">
      <form className="border border-primary rounded-lg p-5 block w-[500px]">
        <div>
          <label htmlFor="username" className="text-xl mb-4 text-white">
            User Name
          </label>
          <input type="text" id="username" className="block mb-4 w-full rounded-md text-xl px-4 py-2" />
        </div>
        <div>
          <label htmlFor="password" className="text-xl text-white">
            Password
          </label>
          <input type="password" id="password" className="block mb-8 w-full rounded-md text-xl px-4 py-2" />
        </div>
        <div className="flex items-center justify-center">
          <Button className="text-2xl text-white font-bold">Log in</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
