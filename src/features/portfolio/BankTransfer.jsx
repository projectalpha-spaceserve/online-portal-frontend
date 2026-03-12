import CopyToClipboard from "../../components/CopyToClipboard";
import Spinner from "../../components/Spinner";
import { useActiveMutual } from "./useActiveMutual";

function BankTransfer({ invest, data, onSuccess }) {
  const { isMutualProduct, mutualProduct } = useActiveMutual(data?.ACCOUNT_ID);

  return (
    <div className="p-8">
      <h1 className="text-xl font-medium">Bank Transfer</h1>
      <p className="text-[10px] text-[#A6A6A6] mt-2">
        Fund your investment by transferring to the account below using any of
        your bank mobile apps.
      </p>

      {isMutualProduct ? (
        <Spinner />
      ) : (
        <>
          <div className="mt-4 bg-brand-350 p-8 space-y-1 rounded-lg">
            <div className="">
              <p className="text-xs font-medium">Bank</p>
              <h1 className="text-sm font-medium">
                {mutualProduct?.BANK_NAME}
              </h1>
            </div>
            <div className="">
              <p className="text-xs font-medium">Account Name</p>
              <h1 className="text-sm font-medium">SAMTL Investment Fund</h1>
            </div>
            <div className="">
              <p className="text-xs font-medium">Account Number</p>
              <div className="flex justify-between gap-5 items-center">
                <h1 className="text-sm font-medium">
                  {mutualProduct?.ACCOUNT_NUMBER}
                </h1>

                <CopyToClipboard text={mutualProduct?.ACCOUNT_NUMBER} />
              </div>
            </div>
            <div className="">
              <p className="text-xs font-medium">Amount</p>
              <h1 className="text-sm font-medium text-brand-425">
                ₦{invest?.amount?.toLocaleString()}
              </h1>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={onSuccess}
              className="bg-brand-green-50 text-white px-4 py-2 rounded text-xs cursor-pointer"
            >
              I&apos;ve transferred the money
            </button>
          </div>
        </>
      )}

      {/* {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <Successs />
        </Modal>
      )} */}
    </div>
  );
}

export default BankTransfer;
