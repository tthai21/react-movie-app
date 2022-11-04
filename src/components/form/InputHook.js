import React from "react";
import { useController } from "react-hook-form";

const InputHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return <input className="w-full text-xl px-4 py-2 border border-gray-100 rounded-lg bg-white outline-none transition-all focus:border-blue-500" {...field} {...props}></input>;
};

export default InputHook;
