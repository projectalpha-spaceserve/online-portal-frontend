import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import { formatAmount } from "../../constants/helper";

function MutualInfo({ data, onBuyMore, onWithdrawal }) {
  return (
    <>
      <div className="p-8 bg-brand-475 mt-10">
        <h1 className="font-semibold mb-4 text-brand-400">
          {data?.FUND_DESCRIPTION}
        </h1>
        <div>
          <p className="text-xs">Balance Quantity</p>
          <h1 className="text-sm font-medium">
            ₦{formatAmount(data.BALANCE_QUANTITY)}
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-b border-brand-75 py-2 my-4">
          <div>
            <p className="text-xs">Amount Invested</p>
            <h1 className="text-sm font-medium">
              ₦{data.TOTAL_PURCHASE_AMOUNT}
            </h1>
          </div>
          <div>
            <p className="text-xs">Total Purchase Quantity</p>
            <h1 className="text-sm font-medium">
              ₦{data.TOTAL_PURCHASE_QUANTITY}
            </h1>
          </div>
          <div>
            <p className="text-xs">Cost Value</p>
            <h1 className="text-sm font-medium">₦{data.COST_VALUE}</h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs">Cost Price</p>
            <h1 className="text-sm font-medium">
              ₦{formatAmount(data.COST_PRICE)}
            </h1>
          </div>
          <div>
            <p className="text-xs">Current Bid Price</p>
            <h1 className="text-sm font-medium">
              ₦{formatAmount(data.CURRENT_BID_PRICE)}
            </h1>
          </div>
          <div>
            <p className="text-xs">Current Value</p>
            <h1 className="text-sm font-medium">
              ₦{formatAmount(data.CURRENT_VALUE)}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 justify-center mt-5">
        <Btn onClick={onBuyMore}>Buy more</Btn>
        <BtnOutline onClick={onWithdrawal}>Withdraw</BtnOutline>
      </div>
    </>
  );
}

export default MutualInfo;
