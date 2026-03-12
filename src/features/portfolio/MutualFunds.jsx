import { useState } from "react";
import coin from "../../assets/images/chip.png";
import pattern from "../../assets/images/pattern.png";
import { formatAmount } from "../../constants/helper";
import { useActiveMutuals } from "./useActiveMutuals";
import ActiveMutualCard from "../../components/ActiveMutualCard";
import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import MutualInfo from "./MutualInfo";
import InvestMutual from "./InvestMutual";
import BankTransfer from "./BankTransfer";
import Successs from "./Successs";
import MutualLiquidate from "./MutualLiquidate";
import BtnOutline from "../../components/BtnOutline";
import MutualStatement from "./MutualStatement";
import { useNavigate } from "react-router-dom";

function MutualFunds() {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState(null);
  // null | "info" | "invest" | "bank" | "success"

  const [selectedMutual, setSelectedMutual] = useState(null);
  const [investmentData, setInvestmentData] = useState(null);

  const { isActiveMutuals, activeMutuals } = useActiveMutuals();
  const activeInvestments = activeMutuals?.mutual_fund_products;
  const balance = activeMutuals?.mutual_fund_balance;

  const handleCardClick = (active) => {
    setSelectedMutual(active);
    setModalStep("info");
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <BtnOutline onClick={() => setModalStep("statement")}>
          View Statement
        </BtnOutline>
      </div>
      <div className="h-[120px] bg-brand-400 text-white relative rounded-2xl mb-6">
        <img
          src={pattern}
          className="absolute inset-0 object-top h-full w-full"
        />
        <div className="p-8">
          <div className="grid grid-cols-2 items-center gap-8 mb-2 md:mb-4">
            <h1 className="text-sm md:text-xl font-semibold">Mutual Funds</h1>
            <img src={coin} alt="Icon" className="justify-self-end" />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <p className="text-[10px] md:text-xs">Current Balance Amount</p>
            <h1 className="text-right text-xs md:text-sm font-medium">
              ₦{formatAmount(balance)}
            </h1>
          </div>
        </div>
      </div>

      <div className="md:mt-10">
        <h1 className="text-lg font-medium mb-4">Active Investments</h1>
        {isActiveMutuals ? (
          <Spinner />
        ) : (
          <div>
            {activeInvestments?.length > 0 ? (
              activeInvestments?.map((mutual) => (
                <ActiveMutualCard
                  key={mutual.FUND_ID}
                  data={mutual}
                  onClick={() => handleCardClick(mutual)}
                />
              ))
            ) : (
              <div className="bg-gray-50 border border-brand-75 rounded-xl p-8 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  No Active Investments Yet
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  You currently do not have any active investment products.
                  Start investing today to grow your portfolio.
                </p>
                <BtnOutline onClick={() => navigate("/products")}>
                  Explore Investment Options
                </BtnOutline>
              </div>
            )}
          </div>
        )}
      </div>

      {modalStep && (
        <Modal onClose={() => setModalStep(null)}>
          {modalStep === "info" && (
            <MutualInfo
              data={selectedMutual}
              onBuyMore={() => setModalStep("invest")}
              onWithdrawal={() => setModalStep("withdraw")}
            />
          )}

          {modalStep === "invest" && (
            <InvestMutual
              data={selectedMutual}
              onProceed={(formData) => {
                setInvestmentData(formData);
                setModalStep("bank");
              }}
              onClose={() => setModalStep(null)}
            />
          )}

          {modalStep === "bank" && (
            <BankTransfer
              invest={investmentData}
              data={selectedMutual}
              onSuccess={() => setModalStep("success")}
              onClose={() => setModalStep(null)}
            />
          )}

          {modalStep === "success" && (
            <Successs onClose={() => setModalStep(null)} />
          )}

          {modalStep === "withdraw" && (
            <MutualLiquidate
              data={selectedMutual}
              onClose={() => setModalStep(null)}
            />
          )}

          {modalStep === "statement" && (
            <MutualStatement
              investments={activeInvestments}
              onClose={() => setModalStep(null)}
            />
          )}
        </Modal>
      )}
    </>
  );
}

export default MutualFunds;
