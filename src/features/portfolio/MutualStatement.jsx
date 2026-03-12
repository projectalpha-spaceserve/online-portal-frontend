import { useForm } from "react-hook-form";
import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import ErrorMessage from "../../components/ErrorMessage";
import { useMutualStatement } from "./useMutualStatement";
import { useActiveMutuals } from "./useActiveMutuals";

function MutualStatement({ onClose }) {
  const { mutualStatement, isMutualStatement } = useMutualStatement();
  const { isActiveMutuals, activeMutuals } = useActiveMutuals();
  const investments = activeMutuals?.mutual_fund_products;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function onSubmit(payload) {
    mutualStatement(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  }

  return (
    <div className="p-8 mt-4">
      <h1 className="text-xl font-bold mb-3">Mutual Statement</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <lable className="text-xs font-medium text-brand-850">
            Investment
          </lable>
          <select
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            disabled={isActiveMutuals}
            {...register("fund_id", {
              required: "Please select the investment",
            })}
          >
            <option value="">Select</option>
            {investments?.map((inv, i) => (
              <option key={i} value={inv.FUND_ID}>
                {inv.FUND_DESCRIPTION}
              </option>
            ))}

            {investments?.length < 1 && (
              <option disabled>No investmnet found</option>
            )}
          </select>
          {errors.fund_id && (
            <ErrorMessage errorText={errors.fund_id.message} />
          )}
        </div>
        <div className="mb-4">
          <lable className="text-xs font-medium text-brand-850">
            Start date
          </lable>
          <input
            type="date"
            disabled={isMutualStatement}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("start_date", { required: "Please enter start date" })}
          />
          {errors.start_date && (
            <ErrorMessage errorText={errors.start_date.message} />
          )}
        </div>
        <div className="mb-4">
          <lable className="text-xs font-medium text-brand-850">End date</lable>
          <input
            type="date"
            disabled={isMutualStatement}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("end_date", {
              required: "Please enter end date",
            })}
          />
          {errors.end_date && (
            <ErrorMessage errorText={errors.end_date.message} />
          )}
        </div>
        <div className="flex justify-center gap-5">
          <Btn disabled={isMutualStatement} type="submit">
            {isMutualStatement ? "Submitting.." : "Submit"}
          </Btn>
          <BtnOutline onClick={onClose}>Cancel</BtnOutline>
        </div>
      </form>
    </div>
  );
}

export default MutualStatement;
