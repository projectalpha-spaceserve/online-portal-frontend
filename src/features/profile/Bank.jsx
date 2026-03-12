import { useForm } from "react-hook-form";
import { useUploadBank } from "../get-started/kyc/useUploadBank";
import { useBanks } from "../utils/useBanks";
import Btn from "../../components/Btn";
import SearchableSelect from "../../components/SearchableSelect";
import { useBank } from "../get-started/kyc/useBank";
import InfoRow from "../../components/InflowRow";
import Spinner from "../../components/Spinner";
import ErrorMessage from "../../components/ErrorMessage";

function Bank() {
  const { isBanksPending, banks, banksError } = useBanks();
  const { uploadBank, isUploadBank } = useUploadBank();
  const { isBank, bank } = useBank();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    uploadBank(data, {
      onSettled: () => reset(),
    });
  };

  if (isBank) return <Spinner />;

  // ✅ If bank exists, show read-only view
  if (bank) {
    return (
      <div className="">
        <h1 className="font-semibold text-lg mb-4">Bank Information</h1>
        <div className="space-y-4 rounded-md border border-brand-75 p-5">
          <InfoRow label="Bank Name" value={bank.bank_name} />
          <InfoRow label="Account Number" value={bank.bank_account_no} />
          <InfoRow label="Account Name" value={bank.bank_account_name} />
        </div>
      </div>
    );
  }

  // ✅ Otherwise show form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="text-xs" htmlFor="account_name">
          Account Name
        </label>
        <input
          type="text"
          id="account_name"
          disabled={isUploadBank}
          className="border border-brand-75 block text-sm p-2 w-full rounded-md mt-1"
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

      <div>
        <label className="text-xs" htmlFor="account_no">
          Account Number
        </label>
        <input
          type="text"
          id="account_no"
          disabled={isUploadBank}
          className="border border-brand-75 block text-sm p-2 w-full rounded-md mt-1"
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

      <div className="mt-5 flex justify-end">
        <Btn disabled={isUploadBank}>
          {isUploadBank ? "Saving..." : "Save Details"}
        </Btn>
      </div>
    </form>
  );
}

export default Bank;
