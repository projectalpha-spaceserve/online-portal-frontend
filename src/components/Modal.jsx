import { useEffect } from "react";
import { createPortal } from "react-dom";
import { HiMiniXMark } from "react-icons/hi2";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] bg-black/30 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-[8px] shadow-xl py-8 transition-all w-[85%] md:w-auto max-h-[95vh] overflow-y-auto md:min-w-sm lg:min-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 p-1.5 bg-brand-400 rounded-md hover:bg-brand-500 transition-colors"
        >
          <HiMiniXMark className="w-6 h-6 text-white" />
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
