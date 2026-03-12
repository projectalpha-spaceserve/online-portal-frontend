import { FaAsterisk } from "react-icons/fa";
import arrow from "../assets/images/arrow.png";
import { formatAmount } from "../constants/helper";

function MutualCard({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      className={`${data.FUND_DESCRIPTION === "SAMTL MIXED INCOME FUND" ? "mixedFundBg" : "moneyFundBg"}
 px-5 py-4 border-[0.725px] border-brand-125 rounded-2xl relative h-[140px] cursor-pointer`}
    >
      <h1 className="font-medium">{data.FUND_DESCRIPTION}</h1>
      <p className="text-[10px] mt-4 text-[#A6A6A6]">Min. Investment Amount</p>
      <h1 className="text-brand-green-100 font-medium text-xl">
        ₦{formatAmount(data.MINIMUM_INVESTMENT_AMOUNT)}
      </h1>
      <img src={arrow} className="h-20 absolute -bottom-1 left-[30%]" />
      <div className="flex justify-end -mt-4">
        <button className="text-[10px] bg-brand-green-200 text-brand-green-100 py-1 px-2 rounded-md flex items-center gap-1">
          Moderate <FaAsterisk />
        </button>
      </div>
    </div>
  );
}

export default MutualCard;
