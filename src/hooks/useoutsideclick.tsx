import { useEffect, useState } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref:any) {
  const [isoutside,setIsOutside]=useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event:any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOutside(!isoutside)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return {
    setIsOutside,
    isoutside
  }
}

export {
    useOutsideAlerter
}