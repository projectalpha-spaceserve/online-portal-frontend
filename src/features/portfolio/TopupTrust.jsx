import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import ErrorMessage from "../../components/ErrorMessage";
import FormattedAmountInput from "../../components/FormattedAmountInput";
import SpinnerMini from "../../components/SpinnerMini";
import { useTopupTrust } from "./useTopupTrust";

function TopupTrust({ data, onClose }) {
  // const id = data?.PRODUCT_ID;

  const minAmount = 10_000;
  const maxAmount = data?.MAXIMUM_INVEST_AMOUNT;
  const { topupTrust, isTopupTrust } = useTopupTrust();
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

  useEffect(() => {
    setValue("fund_id", data?.FUND_ID);
  }, [data?.FUND_ID, setValue]);

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      redirect_url: `${window.location.origin}/trustees`,
    };

    topupTrust(payload, {
      onSuccess: (res) => {
        const url = res?.authorization_url;

        if (url) {
          window.location.href = url;
          onClose();
        } else {
          toast.error("Unable to start payment. Please, try again.");
        }
      },
      onSettled: () => reset(),
    });
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("fund_id")} />
        <div className="mb-4">
          <label className="text-xs font-medium text-brand-850">Amount</label>

          <FormattedAmountInput
            name="amount"
            control={control}
            disabled={isTopupTrust}
            rules={{
              required: "Please enter the amount you want to invest with.",
              validate: (value) => {
                const numericValue = Number(value);

                if (!numericValue || numericValue <= 0)
                  return "Amount must be greater than zero.";

                if (numericValue < minAmount)
                  return `Minimum topup amount is ₦${minAmount.toLocaleString()}.`;

                if (numericValue > maxAmount)
                  return `Maximum topup amount is ₦${minAmount.toLocaleString()}.`;

                return true;
              },
            }}
          />

          {errors.amount && <ErrorMessage errorText={errors.amount.message} />}
        </div>

        <div className="flex justify-center gap-5">
          <Btn disabled={isTopupTrust}>
            {isTopupTrust ? <SpinnerMini /> : "Make payment"}
          </Btn>
          <BtnOutline onClick={onClose} disabled={isTopupTrust}>
            Cancel
          </BtnOutline>
        </div>
      </form>
    </div>
  );
}

export default TopupTrust;
