import { useState } from "react";

function SideTab({ tabs, defaultIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  return (
    <div className="w-full flex flex-col md:flex-row items-start gap-5">
      {/* Tab headers */}
      <div
        className="
  flex md:flex-col gap-3
  personalBg
  px-2.5 py-2.5 md:py-16
  rounded-lg
  w-full md:w-3xs
  overflow-x-auto md:overflow-visible
  whitespace-nowrap md:whitespace-normal scrollbar-hide
"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`flex-shrink-0 px-4 py-2 text-xs font-medium transition-colors duration-200 flex items-center gap-2
    ${
      activeIndex === index
        ? "bg-brand-400 text-white"
        : "text-black hover:text-gray-700"
    }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="md:px-5 w-full md:w-[75%]">
        {tabs[activeIndex] && tabs[activeIndex].content}
      </div>
    </div>
  );
}

export default SideTab;
