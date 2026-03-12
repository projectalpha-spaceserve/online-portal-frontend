import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import pattern from "../../assets/images/pattern.png";
import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import {
  formatAmountDigit,
  formatDate,
  formatProductDescription,
  formattedName,
} from "../../constants/helper";
import InfoRow from "../../components/InflowRow";

function TrustInfo({ data, onWithdrawal, onBuyMore }) {
  const [showBalance, setShowBalance] = useState(true);

  const { title, code } = formatProductDescription(data.PRODUCT_DESC);

  const formatMoney = (amount) =>
    showBalance ? `₦${formatAmountDigit(amount)}` : "₦••••••";

  return (
    <div>
      <div className="p-6 mt-4">
        <div className="relative overflow-hidden rounded-2xl bg-brand-400 text-white shadow-lg">
          <img
            src={pattern}
            alt="pattern"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative p-8 space-y-4">
            {/* Product Code */}
            <div>
              <h1 className="text-xl font-semibold">{code}</h1>
              <p className="text-xs opacity-80">({title})</p>
            </div>

            {/* Balance + Eye Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-80">Current Balance</p>
                <h1 className="text-xl font-bold">
                  {formatMoney(data.CURRENT_BALANCE_AMOUNT)}
                </h1>
              </div>

              <button
                onClick={() => setShowBalance((prev) => !prev)}
                className="text-white text-xl"
              >
                {showBalance ? <HiEyeSlash /> : <HiEye />}
              </button>
            </div>

            {/* Account Name */}
            <p className="text-xs opacity-90">
              Account Name: {formattedName(data?.CUSTOMER_NAME)}
            </p>
          </div>
        </div>
      </div>

      {/* ========== DETAILS SECTION ========== */}
      <div className="bg-brand-810 px-8 py-5 space-y-4">
        <InfoRow
          label="Current Balance Amount"
          value={formatMoney(data.CURRENT_BALANCE_AMOUNT)}
        />
        <InfoRow
          label="Expected Gross Interest Amount"
          value={formatMoney(data.EXPECTED_GROSS_INTEREST_AMOUNT)}
        />
        <InfoRow
          label="Expected Net Interest Amount"
          value={formatMoney(data.EXPECTED_NET_INTEREST_AMOUNT)}
        />
        <InfoRow
          label="Investment Amount"
          value={formatMoney(data.INVESTMENT_AMOUNT)}
        />
        <InfoRow
          label="Tenor"
          value={`${formatAmountDigit(data?.TENOR_DAYS)} days`}
        />
        <InfoRow label="Maturity Date" value={formatDate(data.MATURITY_DATE)} />
        <InfoRow label="Start Date" value={formatDate(data.EFFECTIVE_DATE)} />
        <InfoRow label="Interest Rate" value={`${data.INTEREST_RATE}% pa`} />
      </div>

      {/* ========== ACTION BUTTONS ========== */}
      <div className="mt-4 flex justify-center gap-5">
        <Btn onClick={onBuyMore}>Buy more</Btn>
        <BtnOutline onClick={onWithdrawal}>Withdraw</BtnOutline>
      </div>
    </div>
  );
}

export default TrustInfo;
