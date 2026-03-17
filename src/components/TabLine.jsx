import { useSearchParams } from "react-router-dom";

export default function TabLine({ tabs, activeIndex = 0 }) {
  const [, setSearchParams] = useSearchParams();

  const handleTabClick = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex flex-nowrap overflow-x-auto border-b border-gray-200 scrollbar-hide">
        {tabs.map((tab, index) => (
          <button
            key={tab.name || index}
            onClick={() => handleTabClick(tab.name)}
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

      {/* Content */}
      <div className="mt-5">{tabs[activeIndex]?.content}</div>
    </div>
  );
}
