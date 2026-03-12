import { useForm } from "react-hook-form";
import Btn from "../../components/Btn";
import ErrorMessage from "../../components/ErrorMessage";
import { useEffect } from "react";
import BtnOutline from "../../components/BtnOutline";
import { useMutualProducts } from "../products/useMutualProducts";

function InvestMutual({ data, onProceed, onClose }) {
  const { isMutualProducts, mutualProducts } = useMutualProducts();
  const product = mutualProducts?.find(
    (product) => product.FUND_ID === data.FUND_ID,
  );

  const offerPrice = product?.OFFER_PRICE || 0;
  const minAmount = product?.MINIMUM_INVESTMENT_AMOUNT || 0;
  const multiples = product?.SUBSEQUENT_MULTIPLES || 1;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const unit = watch("unit");

  useEffect(() => {
    setValue("fund_id", data?.FUND_ID);
  }, [data?.FUND_ID, setValue]);

  useEffect(() => {
    if (unit && offerPrice) {
      const calculatedAmount = Number(unit) * Number(offerPrice);
      setValue("amount", calculatedAmount);
    }
  }, [unit, offerPrice, setValue]);

  const onSubmit = (formData) => {
    onProceed(formData);
    reset();
  };

  return (
    <>
      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("fund_id")} />
          <div className="mb-4">
            <lable className="text-xs font-medium text-brand-850">
              Purchase Unit
            </lable>
            <input
              type="number"
              step="any"
              disabled={isMutualProducts}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("unit", {
                required: "Please enter the unit you want to purchase.",
                min: {
                  value: minAmount / offerPrice,
                  message: `Minimum investment is ₦${minAmount.toLocaleString()}`,
                },
                validate: (value) =>
                  value % multiples === 0 ||
                  `Units must be in multiples of ${multiples}`,
              })}
            />

            {errors.unit && <ErrorMessage errorText={errors.unit.message} />}
          </div>
          <div className="mb-4">
            <label className="text-xs font-medium text-brand-850">Amount</label>

            <input
              type="text"
              readOnly
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none bg-gray-100"
              value={
                watch("amount")
                  ? Number(watch("amount")).toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : ""
              }
            />

            {errors.amount && (
              <ErrorMessage errorText={errors.amount.message} />
            )}
          </div>

          <div className="flex justify-center gap-5">
            <Btn type="submit">Proceed</Btn>
            <BtnOutline onClick={onClose}>Cancel</BtnOutline>
          </div>
        </form>
      </div>
    </>
  );
}

export default InvestMutual;
