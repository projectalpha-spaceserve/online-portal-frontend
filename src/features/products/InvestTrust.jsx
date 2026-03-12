import { useForm } from "react-hook-form";
import { useCreateTrust } from "./useCreateTrust";
import Btn from "../../components/Btn";
import { useEffect } from "react";
import SpinnerMini from "../../components/SpinnerMini";
import ErrorMessage from "../../components/ErrorMessage";
import toast from "react-hot-toast";
import BtnOutline from "../../components/BtnOutline";
import FormattedAmountInput from "../../components/FormattedAmountInput";

function InvestTrust({ data, onClose }) {
  const id = data?.PRODUCT_ID;

  const minAmount = id === "SHY01" ? 1_000_000 : 50_000;
  const maxAmount = data?.MAXIMUM_INVEST_AMOUNT;
  const { createTrust, isCreateTrust } = useCreateTrust();
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

    createTrust(payload, {
      onSuccess: (res) => {
        const url = res?.authorization_url;

        if (url) {
          window.location.href = url;
          onClose();
        } else {
          toast.error("Unable to start payment. Try again.");
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
            disabled={isCreateTrust}
            rules={{
              required: "Please enter the amount you want to invest with.",
              validate: (value) => {
                const numericValue = Number(value);

                if (!numericValue || numericValue <= 0)
                  return "Amount must be greater than zero.";

                if (numericValue < minAmount)
                  return `Minimum investment amount is ₦${minAmount.toLocaleString()}.`;

                if (numericValue > maxAmount)
                  return `Maximum investment amount is ₦${minAmount.toLocaleString()}.`;

                return true;
              },
            }}
          />

          {errors.amount && <ErrorMessage errorText={errors.amount.message} />}
        </div>

        <div className="mb-5">
          <lable className="text-xs font-medium text-brand-850">Tenor</lable>

          <select
            disabled={isCreateTrust}
            className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
            {...register("tenor", { required: "Please select tenor" })}
          >
            <option value="90">90 days</option>
            <option value="180">180 days</option>
            <option value="360">360 days</option>
          </select>
          {errors.tenor && <ErrorMessage errorText={errors.tenor.message} />}
        </div>
        <div className="flex justify-center gap-5">
          <Btn disabled={isCreateTrust}>
            {isCreateTrust ? <SpinnerMini /> : "Make payment"}
          </Btn>
          <BtnOutline onClick={onClose} disabled={isCreateTrust}>
            Cancel
          </BtnOutline>
        </div>
      </form>
    </div>
  );
}

export default InvestTrust;
