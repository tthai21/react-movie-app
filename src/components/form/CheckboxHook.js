import React from "react";
import { useController } from "react-hook-form";

const CheckboxHook = ({ control, text, ...props }) => {
  const { field } = useController({ control, name: props.name });
  return (
    <label className=" cursor-pointer flex items-center justify-center gap-x-3">
      <input
        type="checkbox"
        {...field}
        {...props}
        id={props.name}
        className="bg-white w-5 h-5"
        checked={field.value}
        value={props.value}
      ></input>      
        <label htmlFor={props.name} className={`cursor-pointer ${props.className}`}>
          {text}
        </label>
     
    </label>
  );
};

export default CheckboxHook;
