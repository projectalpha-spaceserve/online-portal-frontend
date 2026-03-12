import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActiveInvestCard from "../../components/ActiveInvestCard";
import BtnOutline from "../../components/BtnOutline";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import PortfolioSummary from "../portfolio/PortfolioSummary";
import TopupTrust from "../portfolio/TopupTrust";
import TrustInfo from "../portfolio/TrustInfo";
import TrustLiquidate from "../portfolio/TrustLiquidate";
import { useActiveTrusts } from "../portfolio/useActiveTrusts";

function Investments() {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState(null);
  const [selectedTrust, setSelectedTrust] = useState(null);
  const { isActiveTrusts, activeTrusts } = useActiveTrusts();
  const activeInvestments = activeTrusts?.trust_products;

  const handleCardClick = (active) => {
    setSelectedTrust(active);
    setModalStep("info");
  };
  return (
    <div>
      {isActiveTrusts ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-5">
          {activeInvestments?.length > 0 ? (
            activeInvestments.map((trust) => (
              <ActiveInvestCard
                key={trust.FUND_ID}
                data={trust}
                onClick={() => handleCardClick(trust)}
              />
            ))
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                No Active Investments Yet
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                You currently do not have any active investment products. Start
                investing today to grow your portfolio.
              </p>
              <BtnOutline onClick={() => navigate("/trustees")}>
                Explore Investment Options
              </BtnOutline>
            </div>
          )}
        </div>
      )}

      {modalStep && (
        <Modal onClose={() => setModalStep(null)}>
          {modalStep === "info" && (
            <TrustInfo
              data={selectedTrust}
              onWithdrawal={() => setModalStep("withdraw")}
              onBuyMore={() => setModalStep("buyMore")}
            />
          )}
          {modalStep === "buyMore" && (
            <TopupTrust
              data={selectedTrust}
              onClose={() => setModalStep(null)}
            />
          )}

          {modalStep === "withdraw" && (
            <TrustLiquidate
              data={selectedTrust}
              onClose={() => setModalStep(null)}
            />
          )}

          {modalStep === "portfolio" && (
            <PortfolioSummary
              data={selectedTrust}
              onClose={() => setModalStep(null)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default Investments;
