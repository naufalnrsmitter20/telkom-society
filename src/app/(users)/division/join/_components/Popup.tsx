import { useEffect, useRef } from "react";

export default function Popup(props: any) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        props.setTriggers(false);
      }
    };

    if (props.triggers) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props, props.triggers]);

  return props.triggers ? (
    <div className="">
      <div className="w-screen h-full bg-black fixed justify-center items-center bg-opacity-85 flex z-50">
        <div ref={popupRef} className="w-5/6 h-2/3 bg-white absolute rounded-sm">
          {props.children}
        </div>
      </div>
      <button onClick={() => props.setTriggers(false)} className="w-[100px] h-[100px] text-white text-lg font-medium text-center items-center flex justify-center rounded-full fixed z-[10000] right-10 bottom-10 bg-[#F45846]">
        Close
      </button>
    </div>
  ) : null;
}
