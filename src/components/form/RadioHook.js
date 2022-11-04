import React from "react";
import { useController } from "react-hook-form";

const RadioHook = ({ control, ...props }) => {
  const { field } = useController({ control, name: props.name });
  return (
    <label className="custom-radio">
      <input type="radio" {...field} {...props} className={` hidden ${props.className}`}></input>
      <div className=" w-full h-full bg-white rounded-full"></div>
    </label>
  );
};

export default RadioHook;
