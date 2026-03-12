import { HiArrowRight } from "react-icons/hi";
import naira from "../assets/icons/naira.png";
import { formatProductDescription } from "../constants/helper";

function ActiveInvestCard({ data, onClick }) {
  const { code } = formatProductDescription(data.PRODUCT_DESC);

  return (
    <div
      onClick={onClick}
      role="button"
      className="bg-brand-475 rounded-lg flex justify-between items-end gap-0 lg:gap-10 cursor-pointer"
    >
      <div className="flex items-center gap-3 p-4">
        <div className="p-2 rounded-full bg-[#DE4B53]">
          <img src={naira} className="h-4 md:h-6" alt="Icon" />
        </div>
        <div>
          <h1 className="text-brand-400 font-semibold">{code}</h1>
          <p className="text-xs font-medium">
            Investment Balance: ₦{data.CURRENT_BALANCE_AMOUNT}
          </p>
        </div>
      </div>
      <div className="justify-self-end-safe bg-white h-5 md:h-10 p-3 md:p-5 flex items-center mr-0.5 mb-0.5 rounded-tl-4xl">
        <HiArrowRight color="#9F0A0A" className="text-xs md:text-lg" />
      </div>
    </div>
  );
}

export default ActiveInvestCard;
