import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import useClickOutside from "../../hook/useClickOutside";


const DropdownHook = ({
  control,
  setValue,
  name,
  data,
  dropdownLabel = "Select your job",
}) => {
  const { show, setShow, nodeRef } = useClickOutside();
  const [label, setLabel] = useState(dropdownLabel);
useEffect(()=>{
  if(dropdownLabel){
    setLabel(dropdownLabel)
  }
},[dropdownLabel])

  useWatch({
    control,
    name: "job",
  });

  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setShow(false);
    setLabel(e.target.textContent);
  };

  return (
    <div className=" relative" ref={nodeRef}>
      <div
        className=" p-5 rounded-lg border border-gray-100 bg-white items-center justify-between cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <span>{label}</span>
      </div>
      <div
        className={`absolute top-full left-0 w-full rounded-lg bg-white ${
          show ? "" : "opacity-0 invisible"
        }`}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className=" p-5 cursor-pointer hover:bg-gray-100"
            onClick={handleClickDropdownItem}
            data-value={item.value}
          >
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownHook;
