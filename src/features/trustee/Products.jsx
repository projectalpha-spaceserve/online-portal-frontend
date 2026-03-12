import { useState } from "react";
import shyta from "../../assets/images/shyta2.png";
import sket from "../../assets/images/sket2.png";
import skit from "../../assets/images/skit2.png";
import sort from "../../assets/images/sort2.png";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import TrustCard from "../../components/TrustCard";
import InvestTrust from "../products/InvestTrust";
import TrustProduct from "../products/TrustProduct";
import { useTrustProducts } from "../products/useTrustProducts";

function Products() {
  const { isTrustProducts, trustProducts } = useTrustProducts();
  const [selectedTrust, setSelectedTrust] = useState(null);
  const [modalType, setModalType] = useState(null);

  const allowedProductIds = ["SKT01", "SHY01", "SKET", "SRTO1"];

  const TRUST_PRODUCT_IMAGES = {
    SKET: sket,
    SKT01: skit,
    SHY01: shyta,
    SRTO1: sort,
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
    <div>
      <div>
        {isTrustProducts ? (
          <Spinner />
        ) : filteredTrustProducts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
            {trusteeship.map((trustee, i) => (
              <TrustCard disabled trust={trustee} key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-x-10 md:gap-y-14">
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
      </div>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
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

export default Products;

const trusteeship = [
  { image: shyta },
  { image: sket },
  { image: skit },
  { image: sort },
];
