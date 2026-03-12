import { HiArrowLongDown, HiArrowLongUp } from "react-icons/hi2";
import { formatNaira } from "../constants/helper";

function TransactionCard({ type, amount, description }) {
  return (
    <div
      className={`${type === "credit" ? "bg-[#1D4D4F38]" : "bg-[#FBEAEA]"} flex justify-between gap-5 py-4 px-5 rounded-lg`}
    >
      <div className="flex items-center justify-between gap-5">
        <span
          className={`p-1.5 rounded-full text-white text-xs ${type === "credit" ? "bg-[#1D4D4F]" : "bg-brand-400"}`}
        >
          {type === "credit" ? <HiArrowLongDown /> : <HiArrowLongUp />}
        </span>
        <p className="text-xs md:text-sm font-medium">{description}</p>
      </div>
      <h1 className="font-semibold">{formatNaira(amount)}</h1>
    </div>
  );
}

export default TransactionCard;
