import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActiveMutuals } from "../portfolio/useActiveMutuals";
import Spinner from "../../components/Spinner";
import ActiveMutualCard from "../../components/ActiveMutualCard";
import BtnOutline from "../../components/BtnOutline";
import InvestMutual from "../portfolio/InvestMutual";
import BankTransfer from "../portfolio/BankTransfer";
import Successs from "../portfolio/Successs";
import MutualLiquidate from "../portfolio/MutualLiquidate";
import MutualStatement from "../portfolio/MutualStatement";
import Modal from "../../components/Modal";
import MutualInfo from "../portfolio/MutualInfo";

function Investments() {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState(null);
  // null | "info" | "invest" | "bank" | "success"

  const [selectedMutual, setSelectedMutual] = useState(null);
  const [investmentData, setInvestmentData] = useState(null);

  const { isActiveMutuals, activeMutuals } = useActiveMutuals();
  const activeInvestments = activeMutuals?.mutual_fund_products;

  const handleCardClick = (active) => {
    setSelectedMutual(active);
    setModalStep("info");
  };

  function onSuccess() {
    setModalStep(null);
    navigate("/mutual-funds");
  }

  return (
    <div>
      <div>
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
                <BtnOutline onClick={() => navigate("/mutual-funds")}>
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
            <Successs onClick={onSuccess} onClose={() => setModalStep(null)} />
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
    </div>
  );
}

export default Investments;
