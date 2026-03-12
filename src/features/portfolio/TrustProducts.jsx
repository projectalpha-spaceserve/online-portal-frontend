import { useState } from "react";
import coin from "../../assets/images/chip.png";
import pattern from "../../assets/images/pattern.png";
import ActiveInvestCard from "../../components/ActiveInvestCard";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import { formatAmount } from "../../constants/helper";
import TrustInfo from "./TrustInfo";
import TrustLiquidate from "./TrustLiquidate";
import { useActiveTrusts } from "./useActiveTrusts";
import BtnOutline from "../../components/BtnOutline";
import TopupTrust from "./TopupTrust";
import { useNavigate } from "react-router-dom";
import PortfolioSummary from "./PortfolioSummary";

function TrustProducts() {
  const navigate = useNavigate();
  const [modalStep, setModalStep] = useState(null);
  const [selectedTrust, setSelectedTrust] = useState(null);
  const { isActiveTrusts, activeTrusts } = useActiveTrusts();
  const activeInvestments = activeTrusts?.trust_products;
  const balance = activeTrusts?.trust_balance;

  const handleCardClick = (active) => {
    setSelectedTrust(active);
    setModalStep("info");
  };

  return (
    <>
      <div className="mb-4 flex justify-end">
        <BtnOutline onClick={() => setModalStep("portfolio")}>
          View Portfolio Summary
        </BtnOutline>
      </div>
      <div className="h-[120px] bg-brand-400 text-white relative rounded-2xl mb-6">
        <img
          src={pattern}
          className="absolute inset-0 object-top h-full w-full"
        />
        <div className="p-8">
          <div className="grid grid-cols-2 items-center gap-8 mb-2 md:mb-4">
            <h1 className="text-sm md:text-xl font-semibold">
              Trustees Products
            </h1>
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
        {isActiveTrusts ? (
          <Spinner />
        ) : (
          <div>
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
    </>
  );
}

export default TrustProducts;
