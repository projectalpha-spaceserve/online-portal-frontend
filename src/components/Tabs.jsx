import { useState } from "react";

export default function Tabs({ tabs, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full">
      {/* Tab headers */}
      {/* <div className="flex gap-5"> */}
      <div className="flex gap-3 md:gap-5 overflow-x-auto whitespace-nowrap md:overflow-visible">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            // className={`px-4 py-2.5 text-xs font-medium transition-colors duration-200 w-[140px] cursor-pointer rounded-lg
            className={`flex-shrink-0 px-4 py-2.5 text-xs font-medium transition-colors duration-200 w-[140px] cursor-pointer rounded-md
              ${
                activeIndex === index
                  ? "bg-brand-400 text-white"
                  : "text-black bg-brand-125"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>{tabs[activeIndex] && tabs[activeIndex].content}</div>
    </div>
  );
}
