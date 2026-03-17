import { useFieldArray, useForm } from "react-hook-form";
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
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      banks: [
        {
          account_name: "",
          account_no: "",
          bank_name: "",
          bank_cd: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "banks",
  });

  const onSubmit = (formData) => {
    const formatted = {
      data: formData.banks.filter(
        (b) => b.account_name || b.account_no || b.bank_name || b.bank_cd,
      ),
    };

    setPendingData(formatted);
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
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-brand-75 p-4 rounded space-y-4"
          >
            <h2 className="text-sm font-medium">Bank {index + 1}</h2>

            {/* Account Name */}
            <div>
              <label className="text-xs">Account Name</label>
              <input
                type="text"
                disabled={isUploadBank}
                className="px-5 py-2 text-sm w-full rounded-sm"
                {...register(`banks.${index}.account_name`, {
                  required: index === 0 ? "Please enter account name" : false,
                })}
              />
              {errors?.banks?.[index]?.account_name && (
                <ErrorMessage
                  errorText={errors.banks[index].account_name.message}
                />
              )}
            </div>

            {/* Account Number */}
            <div>
              <label className="text-xs">Account Number</label>
              <input
                type="text"
                maxLength={10}
                disabled={isUploadBank}
                className="px-5 py-2 text-sm w-full rounded-sm"
                {...register(`banks.${index}.account_no`, {
                  required: index === 0 ? "Please enter account number" : false,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Account number must be exactly 10 digits",
                  },
                })}
              />
              {errors?.banks?.[index]?.account_no && (
                <ErrorMessage
                  errorText={errors.banks[index].account_no.message}
                />
              )}
            </div>

            {/* Bank Select */}
            <SearchableSelect
              label="Bank Name"
              fieldName={`banks.${index}.bank_cd`}
              options={banks}
              searchKeys={["BANK_DSC"]}
              getOptionLabel={(o) => o.BANK_DSC}
              getOptionValue={(o) => o.NIBSS_ID}
              extraFields={[
                {
                  name: `banks.${index}.bank_name`,
                  value: (o) => o.BANK_DSC,
                },
              ]}
              register={register}
              setValue={setValue}
              watch={watch}
              errors={errors}
              placeholder="Select bank"
              searchPlaceholder="Search bank..."
              isLoading={isBanksPending}
              error={banksError}
            />

            {/* Remove button (only for second bank) */}
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-brand-400 hover:text-brand-425 cursor-pointer text-xs"
              >
                Remove Bank
              </button>
            )}
          </div>
        ))}

        {fields.length < 2 && (
          <button
            type="button"
            onClick={() =>
              append({
                account_name: "",
                account_no: "",
                bank_name: "",
                bank_cd: "",
              })
            }
            className="text-sm text-blue-600"
          >
            + Add Another Bank
          </button>
        )}
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
