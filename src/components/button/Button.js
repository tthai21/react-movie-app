import React from "react";

const Button = ({
  onCLick,
  className = "",
  type = "button",
  bgColor = "primary",
  children,
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary ";
      break;
    case "secondary":
      bgClassName = "bg-secondary ";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onCLick}
      className={`py-3 px-4 w-full rounded-xl capitalize lg:mt-auto ${bgClassName} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
