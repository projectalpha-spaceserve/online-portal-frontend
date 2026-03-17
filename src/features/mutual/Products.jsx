import { useState } from "react";
import { useMutualProducts } from "../products/useMutualProducts";
import mixedFund from "../../assets/images/mixedFund.png";
import MutualCard from "../../components/MutualCard";
import MutualProduct from "../products/MutualProduct";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";

function Products() {
  const { isMutualProducts, mutualProducts } = useMutualProducts();
  const [selectedFund, setSelectedFund] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handleCardClick = (fund) => {
    setSelectedFund(fund);
    setModalType("mutual");
  };

  return (
    <div>
      <div>
        {isMutualProducts ? (
          <Spinner />
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
      </div>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          {modalType === "mutual" && (
            <MutualProduct
              fund={selectedFund}
              onClose={() => setModalType(null)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

export default Products;
