import { useState } from "react";

export default function TabLine({ tabs, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full">
      {/* Tab headers */}
      <div className="flex flex-nowrap overflow-x-auto border-b border-gray-200 scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors duration-200
              ${
                activeIndex === index
                  ? "border-b-2 border-[#a62325] text-[#a62325]"
                  : "text-black hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {tabs[activeIndex] && tabs[activeIndex].content}
      </div>
    </div>
  );
}
