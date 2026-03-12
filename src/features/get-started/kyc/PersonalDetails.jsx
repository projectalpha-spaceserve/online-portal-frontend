import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/ErrorMessage";
import Spinner from "../../../components/Spinner";
import SpinnerMini from "../../../components/SpinnerMini";
import { useUser } from "../../auth/useUser";
import { useLga } from "../../utils/useLga";
import { useStates } from "../../utils/useStates";
import { useUploadBiodata } from "./useUploadBiodata";
import FormBtn from "../../../components/FormBtn";
import SearchableSelect from "../../../components/SearchableSelect";
import ConfirmModal from "../../../components/ConfirmModal";

function PersonalDetails() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const { isPending, user } = useUser();
  const { uploadBiodata, isUploadBiodata } = useUploadBiodata();
  const { isStatePending, state, stateError } = useStates();
  const { isLgaPending, lga, lgaError } = useLga();

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gender: "",
      marital_status: "",
      birth_date: "",
      street: "",
      city: "",
      state: "",
      country: "",
      occupation: "",
      lga: "",
    },
  });

  const selectedState = watch("state");

  const filteredLga = useMemo(() => {
    if (!selectedState) return lga;
    return lga?.filter((item) => item.STATE_CD === selectedState) || [];
  }, [lga, selectedState]);

  useEffect(() => {
    setValue("lga", "");
  }, [selectedState, setValue]);

  useEffect(() => {
    if (user) {
      reset({
        gender: user.gender ?? "",
        marital_status: user.marital_status ?? "",
        birth_date: user.dob ?? "",
        street: user.customer_address ?? "",
        city: user.customer_city ?? "",
        state: user.state ?? "",
        country: user.customer_country ?? "Nigeria",
        occupation: user.occupation ?? "",
        lga: user.lga ?? "",
      });
    }
  }, [user, reset]);

  const onSubmit = (payload) => {
    setPendingData(payload);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    if (!pendingData) return;

    uploadBiodata(pendingData, {
      onSettled: () => {
        reset();
        setShowConfirmModal(false);
        setPendingData(null);
      },
    });
  };

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-xl font-medium pb-2">Personal Details</h1>
      <p className="text-sm">
        To keep your investments safe, SAMTL collects certain information as
        required by federal law.
      </p>

      <form className="mt-5 md:space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              disabled
              defaultValue={user?.first_name}
            />
          </div>
          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              disabled
              defaultValue={user?.last_name}
            />
          </div>

          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              disabled
              defaultValue={user?.email}
            />
          </div>
          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              disabled
              defaultValue={user?.phone}
            />
          </div>

          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              id="gender"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              disabled={isUploadBiodata}
              {...register("gender", {
                required: "Please select your gender",
              })}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && (
              <ErrorMessage errorText={errors.gender.message} />
            )}
          </div>
          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="maritalStatus"
            >
              Marital Status
            </label>
            <select
              id="maritalStatus"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              disabled={isUploadBiodata}
              {...register("marital_status", {
                required: "Please select your marital status",
              })}
            >
              <option value="">Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widow">Widow</option>
              <option value="Widower">Widower</option>
            </select>
            {errors.marital_status && (
              <ErrorMessage errorText={errors.marital_status.message} />
            )}
          </div>

          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="dateOfBirth"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              disabled={isUploadBiodata}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("birth_date", {
                required: "Please enter your date of birth",
              })}
            />
            {errors.birth_date && (
              <ErrorMessage errorText={errors.birth_date.message} />
            )}
          </div>
          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="nationality"
            >
              Nationality
            </label>
            <input
              type="text"
              id="nationality"
              disabled={isUploadBiodata}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("country", {
                required: "Please enter your nationality",
                minLength: {
                  value: 3,
                  message: "Please provide a valid nationality",
                },
              })}
            />
            {errors.country && (
              <ErrorMessage errorText={errors.country.message} />
            )}
          </div>

          <SearchableSelect
            label="State of Origin"
            fieldName="state"
            options={state}
            searchKeys={["STATE_DSC"]}
            getOptionLabel={(o) => o.STATE_DSC}
            getOptionValue={(o) => o.STATE_CD}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            placeholder="Please select your state of origin"
            searchPlaceholder="Search state..."
            isLoading={isStatePending}
            error={stateError}
          />

          <SearchableSelect
            label="LGA"
            fieldName="lga"
            placeholder="Please select your LGA"
            searchPlaceholder="Search LGA..."
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            options={filteredLga}
            searchKeys={["LGA_DSC"]}
            isLoading={isLgaPending}
            error={lgaError}
            getOptionLabel={(o) => o.LGA_DSC}
            getOptionValue={(o) => o.LGA_CD}
          />

          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="houseAddress"
            >
              House Address
            </label>
            <input
              type="text"
              id="houseAddress"
              disabled={isUploadBiodata}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("street", {
                required: "Please enter your house Address",
                minLength: {
                  value: 6,
                  message: "Please provide a valid house Address",
                },
              })}
            />
            {errors.street && (
              <ErrorMessage errorText={errors.street.message} />
            )}
          </div>
          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="occupation"
              disabled={isUploadBiodata}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("city", {
                required: "Please enter your city",
              })}
            />
            {errors.city && <ErrorMessage errorText={errors.city.message} />}
          </div>
          <div>
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="occupation"
            >
              Occupation
            </label>
            <input
              type="text"
              id="occupation"
              disabled={isUploadBiodata}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("occupation", {
                required: "Please enter your occupation",
              })}
            />
            {errors.occupation && (
              <ErrorMessage errorText={errors.occupation.message} />
            )}
          </div>
        </div>

        <div>
          <FormBtn disabled={isUploadBiodata}>
            {isUploadBiodata ? <SpinnerMini /> : "Save Details"}
          </FormBtn>
        </div>
      </form>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        isLoading={isUploadBiodata}
        title="Confirm Submission"
        message="Are you sure you want to submit your personal details?"
        warningText="This information cannot be edited after submission."
        confirmText="Yes, Submit"
      />
    </div>
  );
}

export default PersonalDetails;
