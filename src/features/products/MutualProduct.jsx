import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import SpinnerMini from "../../components/SpinnerMini";
import { formatAmount, formatedLongDate } from "../../constants/helper";
import { useCreateMutual } from "./useCreateMutual";

function MutualProduct({ fund, onClose }) {
  const { createMutual, isCreateMutual } = useCreateMutual();

  return (
    <div className="h-[80%]">
      <div className="px-8 mt-4">
        <h1 className="text-xl font-medium">{fund?.FUND_DESCRIPTION}</h1>
        <p className="text-[10px] text-[#A6A6A6] mt-2">
          Min. Investment Amount
        </p>
        <h1 className="text-brand-green-100 font-medium text-xl">
          ₦{formatAmount(fund.MINIMUM_INVESTMENT_AMOUNT)}
        </h1>
      </div>
      <div className="mt-4 fundBg p-8 space-y-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Instrument Type</p>
          <h1 className="text-right text-sm font-medium">{fund.FUND_TYPE}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Min. Holding Period</p>
          <h1 className="text-right text-sm font-medium">90 days</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Offer Price</p>
          <h1 className="text-right text-sm font-medium">
            ₦{formatAmount(fund.OFFER_PRICE)}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Bid Price</p>
          <h1 className="text-right text-sm font-medium">
            ₦{formatAmount(fund.BID_PRICE)}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Subsequent Multiples</p>
          <h1 className="text-right text-sm font-medium">
            {fund.SUBSEQUENT_MULTIPLES}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Investment Basis</p>
          <h1 className="text-right text-sm font-medium">
            {fund.INVESTMENT_BASIS}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Risk Level</p>
          <h1 className="text-right text-sm font-medium">Moderate</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <p className="text-xs">Opened Date</p>
          <h1 className="text-right text-sm font-medium">
            {formatedLongDate(fund.DATE_OPENED)}
          </h1>
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-5">
        <Btn
          disabled={isCreateMutual}
          onClick={() => {
            if (!fund?.FUND_ID) return;
            createMutual({ fund_id: fund.FUND_ID });
          }}
        >
          {isCreateMutual ? <SpinnerMini /> : "Invest now"}
        </Btn>
        <BtnOutline onClick={onClose}>Cancel</BtnOutline>
      </div>
    </div>
  );
}

export default MutualProduct;
