import { useForm } from "react-hook-form";
import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import ErrorMessage from "../../components/ErrorMessage";
import { useLinkedAccounts } from "../profile/useLinkedAccounts";
import { usePortfolioSummary } from "./usePortfolioSummary";

function PortfolioSummary({ onClose }) {
  const { isLinkedAccounts, linkedAccounts } = useLinkedAccounts();
  const { isPortfolioSummary, portfolioSummary } = usePortfolioSummary();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(payload) {
    const fund_id = payload.fund_id;

    portfolioSummary(fund_id, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  }
  return (
    <div className="p-8 mt-4">
      <h1 className="text-xl font-bold mb-3">Portfolio Summary</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="text-xs font-medium text-brand-850">
            Investment
          </label>
          <select
            disabled={isLinkedAccounts}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("fund_id", {
              required: "Please select the investment",
            })}
          >
            <option value="">Select</option>
            {linkedAccounts?.map((account, i) => (
              <option key={i} value={account.CUSTOMER_ID}>
                {account.CUSTOMER_NAME}
              </option>
            ))}
            {linkedAccounts?.length < 1 && (
              <option disabled>No investmnet found</option>
            )}
          </select>
          {errors.fund_id && (
            <ErrorMessage errorText={errors.fund_id.message} />
          )}
        </div>
        <div className="flex justify-center gap-5">
          <Btn disabled={isPortfolioSummary}>
            {isPortfolioSummary ? "Submitting..." : "Submit"}
          </Btn>
          <BtnOutline onClick={onClose}>Cancel</BtnOutline>
        </div>
      </form>
    </div>
  );
}

export default PortfolioSummary;
