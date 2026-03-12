import { useForm } from "react-hook-form";
import { useLiquidateMutual } from "./useLiquidateMutual";
import { useEffect } from "react";
import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import ErrorMessage from "../../components/ErrorMessage";
import FormattedAmountInput from "../../components/FormattedAmountInput";

function MutualLiquidate({ data, onClose }) {
  const { liquidateMutual, isLiquidateMutual } = useLiquidateMutual();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const currentBalance = data?.TOTAL_PURCHASE_AMOUNT;

  useEffect(() => {
    setValue("fund_id", data?.FUND_ID);
  }, [data?.FUND_ID, setValue]);

  function onSubmit(payload) {
    liquidateMutual(payload, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-3">Mutual Funds Withdrawal</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("fund_id")} />
        <div className="mb-4">
          <lable className="text-xs font-medium text-brand-850">Amount</lable>
          <FormattedAmountInput
            name="amount"
            control={control}
            disabled={isLiquidateMutual}
            rules={{
              required: "Please enter the amount you want to withdraw.",
              validate: (value) => {
                const numericValue = Number(value);

                const numericBalance = Number(
                  String(currentBalance).replace(/,/g, ""),
                );

                if (!numericValue || numericValue <= 0)
                  return "Amount must be greater than zero.";

                if (numericValue > numericBalance)
                  return `Amount cannot be greater than ₦${numericBalance.toLocaleString()}.`;

                return true;
              },
            }}
          />

          {errors.amount && <ErrorMessage errorText={errors.amount.message} />}
        </div>

        <div className="flex justify-center gap-5">
          <Btn type="submit">Proceed</Btn>
          <BtnOutline onClick={onClose}>Cancel</BtnOutline>
        </div>
      </form>
    </div>
  );
}

export default MutualLiquidate;
