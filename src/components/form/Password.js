import React from "react";
import { useController } from "react-hook-form";

const Password = ({
  onCLick = () => {},
  showPassword,
  type = "text",
  control,
  children,
  ...props
}) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <div className="relative">
      <input
        type={!showPassword? "password" : "text"}
        name="password"
        className="w-full text-xl px-4 py-2 border border-gray-100 rounded-lg bg-white outline-none transition-all focus:border-blue-500"
        {...field}
        {...props}
      />  
        <div className="absolute top-1/2 -translate-y-1/2 right-5 cursor-pointer">
         {children}
        </div>   
    </div>
  );
};

export default Password;
