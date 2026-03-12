import { useState } from "react";
import comingSoon from "../assets/images/coming.png";
import mixedFund from "../assets/images/mixedFund.png";
import shyta from "../assets/images/shyta.png";
import sket from "../assets/images/sket.png";
import skit from "../assets/images/skit.png";
import sort from "../assets/images/sort.png";
import Modal from "../components/Modal";
import MutualCard from "../components/MutualCard";
import Spinner from "../components/Spinner";
import TrustCard from "../components/TrustCard";
import InvestTrust from "../features/products/InvestTrust";
import MutualProduct from "../features/products/MutualProduct";
import TrustProduct from "../features/products/TrustProduct";
import { useMutualProducts } from "../features/products/useMutualProducts";
import { useTrustProducts } from "../features/products/useTrustProducts";

export default function Products() {
  const { isMutualProducts, mutualProducts } = useMutualProducts();
  const { isTrustProducts, trustProducts } = useTrustProducts();
  const [selectedFund, setSelectedFund] = useState(null);
  const [selectedTrust, setSelectedTrust] = useState(null);
  const [modalType, setModalType] = useState(null);

  const allowedProductIds = ["SKT01", "SHY01", "SKET", "SRTO1"];

  const TRUST_PRODUCT_IMAGES = {
    SKET: sket,
    SKT01: skit,
    SHY01: shyta,
    SRTO1: sort,
  };

  const handleCardClick = (fund) => {
    setSelectedFund(fund);
    setModalType("mutual");
  };

  const handleTrustClick = (trust) => {
    setSelectedTrust(trust);
    setModalType("trust");
  };

  const handleOpenInvestTrust = () => {
    setModalType("investTrust");
  };

  const filteredTrustProducts = trustProducts.filter((trust) =>
    allowedProductIds.includes(trust.PRODUCT_ID),
  );

  return (
    <div className="container-w">
      <section className="mb-14">
        <h1 className="text-xl font-semibold">Mutual Funds</h1>
        {isMutualProducts ? (
          "Loading..."
        ) : mutualProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-5">
            <div className="relative opacity-60 cursor-not-allowed pointer-events-none">
              <img
                src={mixedFund}
                alt="Mutual Fund Coming Soon"
                className="rounded-xl w-full"
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-black/70 text-white text-xs px-4 py-2 rounded-full">
                  No Mutual Funds Available
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-5">
            {mutualProducts?.map((data) => (
              <MutualCard
                key={data.FUND_ID}
                data={data}
                onClick={() => handleCardClick(data)}
              />
            ))}
          </div>
        )}
      </section>
      <section>
        <h1 className="text-xl font-semibold mb-4">Trustee Products</h1>
        {isTrustProducts ? (
          <Spinner />
        ) : filteredTrustProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {trusteeship.map((trustee, i) => (
              <TrustCard disabled trust={trustee} key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {filteredTrustProducts.map((trust) => (
              <TrustCard
                key={trust.PRODUCT_ID}
                trust={{
                  ...trust,
                  image: TRUST_PRODUCT_IMAGES[trust.PRODUCT_ID],
                }}
                onClick={() => handleTrustClick(trust)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="mt-20">
        <h1 className="text-xl font-semibold">Stocks</h1>
        <div className="flex justify-center mt-7">
          <img src={comingSoon} className="h-[200px]" />
        </div>
      </section>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          {modalType === "mutual" && (
            <MutualProduct
              fund={selectedFund}
              onClose={() => setModalType(null)}
            />
          )}

          {modalType === "trust" && (
            <TrustProduct
              trust={selectedTrust}
              onInvest={handleOpenInvestTrust}
              onClose={() => setModalType(null)}
            />
          )}

          {modalType === "investTrust" && (
            <InvestTrust
              data={selectedTrust}
              onClose={() => setModalType(null)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

const trusteeship = [
  { image: shyta },
  { image: sket },
  { image: skit },
  { image: sort },
];
