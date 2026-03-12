import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/ErrorMessage";
import { useBanks } from "../../utils/useBanks";
import FormBtn from "../../../components/FormBtn";
import SpinnerMini from "../../../components/SpinnerMini";
import SearchableSelect from "../../../components/SearchableSelect";
import { useUploadBank } from "./useUploadBank";
import { useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

function BankDetails() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const { isBanksPending, banks, banksError } = useBanks();
  const { uploadBank, isUploadBank } = useUploadBank();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (payload) => {
    setPendingData(payload);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    if (!pendingData) return;

    uploadBank(pendingData, {
      onSettled: () => {
        reset();
        setShowConfirmModal(false);
        setPendingData(null);
      },
    });
  };

  return (
    <div>
      <h1 className="text-xl font-medium pb-2">Bank Details</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="">
          <label className="text-xs" htmlFor="account_name">
            Account Name
          </label>
          <input
            type="text"
            id="account_name"
            disabled={isUploadBank}
            className="px-5 py-2 text-sm w-full rounded-sm"
            {...register("account_name", {
              required: "Please enter account name",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Account name must contain only letters",
              },
            })}
          />
          {errors.account_name && (
            <ErrorMessage errorText={errors.account_name.message} />
          )}
        </div>
        <div className="">
          <label className="text-xs" htmlFor="account_no">
            Account Number
          </label>
          <input
            type="text"
            id="account_no"
            maxLength={10}
            disabled={isUploadBank}
            className="px-5 py-2 text-sm w-full rounded-sm"
            {...register("account_no", {
              required: "Please enter account number",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Account number must be exactly 10 digits",
              },
            })}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10);
            }}
          />
          {errors.account_no && (
            <ErrorMessage errorText={errors.account_no.message} />
          )}
        </div>
        <SearchableSelect
          label="Bank Name"
          fieldName="bank_cd"
          options={banks}
          searchKeys={["BANK_DSC"]}
          getOptionLabel={(o) => o.BANK_DSC}
          getOptionValue={(o) => o.NIBSS_ID}
          extraFields={[
            {
              name: "bank_name",
              value: (o) => o.BANK_DSC,
            },
          ]}
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
          placeholder="Please select bank name"
          searchPlaceholder="Search bank..."
          isLoading={isBanksPending}
          error={banksError}
        />

        <FormBtn disabled={isBanksPending}>
          {isBanksPending ? <SpinnerMini /> : "Save Details"}
        </FormBtn>
      </form>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        isLoading={isBanksPending}
        title="Confirm Submission"
        message="Are you sure you want to submit your bank details?"
        warningText="This information cannot be edited after submission."
        confirmText="Yes, Submit"
      />
    </div>
  );
}

export default BankDetails;
