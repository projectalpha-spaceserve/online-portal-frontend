import { useForm } from "react-hook-form";
import ErrorMessage from "../../../components/ErrorMessage";
import FormBtn from "../../../components/FormBtn";
import SearchableSelect from "../../../components/SearchableSelect";
import Spinner from "../../../components/Spinner";
import SpinnerMini from "../../../components/SpinnerMini";
import { useRelation } from "../../utils/useRelation";
import { useTitle } from "../../utils/useTitle";
import { useNok } from "./useNok";
import { useUploadNok } from "./useUploadNok";
import { useEffect, useState } from "react";
import ConfirmModal from "../../../components/ConfirmModal";

function NextOfKin() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const { isTitlePending, title, titleError } = useTitle();
  const { isRelationPending, relation, relationError } = useRelation();
  const { uploadNok, isUploadNok } = useUploadNok();
  const { isNokPending, nok } = useNok();

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      firstname: "",
      lastname: "",
      gender: "",
      relationship: "",
      telephone: "",
      email: "",
      street: "",
      city: "",
      country: "",
    },
  });

  useEffect(() => {
    if (nok) {
      reset({
        title: nok?.title || "",
        firstname: nok?.firstname || "",
        lastname: nok?.lastname || "",
        gender: nok?.gender || "",
        relationship: nok?.relationship || "",
        telephone: nok?.telephone || "",
        email: nok?.email || "",
        street: nok?.address_street || "",
        city: nok?.address_city || "",
        country: nok?.address_country || "",
      });
    }
  }, [nok, reset]);

  const onSubmit = (payload) => {
    setPendingData(payload);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    if (!pendingData) return;

    uploadNok(pendingData, {
      onSettled: () => {
        reset();
        setShowConfirmModal(false);
        setPendingData(null);
      },
    });
  };

  if (isNokPending) {
    return <Spinner />;
  }

  return (
    <div className="">
      <h1 className="text-xl font-medium pb-2">Next of Kin Details</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <SearchableSelect
            label="Title"
            fieldName="title"
            options={title}
            searchKeys={["TITLE_DSC"]}
            getOptionLabel={(o) => o.TITLE_DSC}
            getOptionValue={(o) => o.TITLE_CD}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            placeholder="Please select your title"
            searchPlaceholder="Search title..."
            isLoading={isTitlePending}
            error={titleError}
          />
          <div className="">
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              disabled={isUploadNok}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("firstname", {
                required: "Please enter first name",
              })}
            />
            {errors.firstname && (
              <ErrorMessage errorText={errors.firstname.message} />
            )}
          </div>
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Last Name
            </label>
            <input
              type="text"
              disabled={isUploadNok}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("lastname", {
                required: "Please enter last name",
              })}
            />
            {errors.lastname && (
              <ErrorMessage errorText={errors.lastname.message} />
            )}
          </div>

          <div className="">
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              disabled={isUploadNok}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("email", {
                required: "Please enter last name",
              })}
            />
            {errors.email && <ErrorMessage errorText={errors.email.message} />}
          </div>
          <div className="">
            <label
              className="text-xs font-medium text-brand-850"
              htmlFor="telephone"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="telephone"
              disabled={isUploadNok}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("telephone", {
                required: "Please enter last name",
              })}
            />
            {errors.telephone && (
              <ErrorMessage errorText={errors.telephone.message} />
            )}
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
              disabled={isUploadNok}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
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
              htmlFor="houseAddress"
            >
              Street Address
            </label>
            <input
              type="text"
              id="houseAddress"
              disabled={isUploadNok}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("street", {
                required: "Please enter your street Address",
                minLength: {
                  value: 6,
                  message: "Please provide a valid street Address",
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
              htmlFor="stateOfOrigin"
            >
              City
            </label>
            <input
              type="text"
              id="stateOfOrigin"
              disabled={isUploadNok}
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
              htmlFor="nationality"
            >
              Country
            </label>
            <input
              type="text"
              id="nationality"
              disabled={isUploadNok}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("country", {
                required: "Please enter your NOK's Country",
                minLength: {
                  value: 6,
                  message: "Please provide a valid NOK's Country",
                },
              })}
            />
            {errors.country && (
              <ErrorMessage errorText={errors.country.message} />
            )}
          </div>
          <SearchableSelect
            label="Relationship"
            fieldName="relationship"
            options={relation}
            searchKeys={["RELATIONSHIP_DSC"]}
            getOptionLabel={(o) => o.RELATIONSHIP_DSC}
            getOptionValue={(o) => o.RELATIONSHIP_CD}
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            placeholder="Please select your relationship"
            searchPlaceholder="Search relationship..."
            isLoading={isRelationPending}
            error={relationError}
          />
        </div>
        <FormBtn disabled={isUploadNok}>
          {isUploadNok ? <SpinnerMini /> : "Save Details"}
        </FormBtn>
      </form>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        isLoading={isUploadNok}
        title="Confirm Submission"
        message="Are you sure you want to submit your next of kin details?"
        warningText="This information cannot be edited after submission."
        confirmText="Yes, Submit"
      />
    </div>
  );
}

export default NextOfKin;
