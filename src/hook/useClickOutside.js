import { useEffect, useRef, useState } from "react";

function useClickOutside(dom = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    function handleCLickOutside(e) {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        setShow(false);
      }
    }
    document.addEventListener("click", handleCLickOutside);
    return () => {
      document.removeEventListener("click", handleCLickOutside);
    };
  }, [dom]);
 
  return {
    show,
    setShow,
    nodeRef,
  };
}

export default useClickOutside;
