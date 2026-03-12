import { useForm } from "react-hook-form";
import FileUpload from "../../../components/FileUpload";
import { useIdentity } from "../../utils/useIdentity";
import FormBtn from "../../../components/FormBtn";
import { useUploadID } from "./useUploadID";
import { useUploadProof } from "./useUploadProof";
import { useUploadSignature } from "./useUploadSignature";
import ErrorMessage from "../../../components/ErrorMessage";
import {
  convertToBase64,
  generateDocumentNumber,
  getCurrentDate,
} from "../../../constants/helper";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";
import { useQueryClient } from "@tanstack/react-query";

function UploadDocuments() {
  const queryClient = useQueryClient();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const { isIdentityPending, identity } = useIdentity();
  const { uploadID, isUploadID } = useUploadID();
  const { uploadProof, isUploadProof } = useUploadProof();
  const { uploadSignature, isUploadSignature } = useUploadSignature();
  const isSubmitting = isUploadProof || isUploadID || isUploadSignature;
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const selectedDocumentType = watch("document_type");

  const selectedDoc = identity?.find(
    (item) => item.IDENTIFICATION_CD === selectedDocumentType,
  );

  const requiresFullDetails =
    selectedDoc?.IDENTIFICATION_CD === "003" ||
    selectedDoc?.IDENTIFICATION_CD === "004";

  const onSubmit = (payload) => {
    setPendingData(payload);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingData) return;
    const requiresFullDetails =
      pendingData?.document_type === "003" ||
      pendingData?.document_type === "004";

    try {
      const promises = [];

      if (pendingData.document_file) {
        const base64ID = await convertToBase64(pendingData.document_file);
        promises.push(
          uploadID({
            document_type: pendingData.document_type,
            document_file: base64ID,
            document_name: selectedDoc?.IDENTIFICATION_DSC || "",

            document_no: requiresFullDetails
              ? pendingData.document_no
              : generateDocumentNumber(),

            document_issue_date: requiresFullDetails
              ? pendingData.document_issue_date
              : getCurrentDate(),

            document_expiry_date: requiresFullDetails
              ? pendingData.document_expiry_date
              : getCurrentDate(),
          }),
        );
      }

      if (pendingData.document) {
        const base64Proof = await convertToBase64(pendingData.document);
        promises.push(
          uploadProof({ type: pendingData.type, document: base64Proof }),
        );
      }

      if (pendingData.signature) {
        const base64Signature = await convertToBase64(pendingData.signature);
        promises.push(uploadSignature({ signature: base64Signature }));
      }

      await Promise.all(promises);
      await queryClient.refetchQueries({ queryKey: ["kycStatus"] });

      setShowConfirmModal(false);
      setPendingData(null);

      toast.success("Uploaded successfully!");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!requiresFullDetails) {
      setValue("document_no", "");
      setValue("document_issue_date", "");
      setValue("document_expiry_date", "");
    }
  }, [requiresFullDetails, setValue]);

  return (
    <>
      <div>
        <h1 className="text-xl font-medium">Upload Documents</h1>
        <p className="text-sm">
          Your documents help us confirm your identity and ensure your safety.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-5">
          <div>
            <h1 className="text-sm font-medium">Means of ID</h1>
            <p className="text-xs">Upload any valid means of identification.</p>
            <select
              {...register("document_type", {
                required: "Please select an ID type",
              })}
              disabled={isUploadID}
              className="mt-2 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none mb-5"
            >
              <option className="text-brand-850" value="">
                Select ID Type
              </option>
              {isIdentityPending ? (
                <option>Loading...</option>
              ) : (
                identity.map((item, i) => (
                  <option key={i} value={item.IDENTIFICATION_CD}>
                    {item.IDENTIFICATION_DSC}
                  </option>
                ))
              )}
            </select>

            {requiresFullDetails && (
              <div className="my-4 grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-3">
                {/* Document Number */}
                <div>
                  <label className="text-sm">Document Number</label>
                  <input
                    type="text"
                    {...register("document_no", {
                      required: "Document number is required",
                    })}
                    disabled={isUploadID}
                    className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
                  />
                  {errors.document_no && (
                    <ErrorMessage errorText={errors.document_no.message} />
                  )}
                </div>

                {/* Issue Date */}
                <div>
                  <label className="text-sm">Issue Date</label>
                  <input
                    type="date"
                    {...register("document_issue_date", {
                      required: "Issue date is required",
                    })}
                    disabled={isUploadID}
                    className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
                  />
                  {errors.document_issue_date && (
                    <ErrorMessage
                      errorText={errors.document_issue_date.message}
                    />
                  )}
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="text-sm">Expiry Date</label>
                  <input
                    type="date"
                    {...register("document_expiry_date", {
                      required: "Expiry date is required",
                    })}
                    disabled={isUploadID}
                    className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
                  />
                  {errors.document_expiry_date && (
                    <ErrorMessage
                      errorText={errors.document_expiry_date.message}
                    />
                  )}
                </div>
              </div>
            )}

            <FileUpload
              onFileSelect={(file) => {
                setValue("document_file", file, { shouldValidate: true });
              }}
            />
            {errors.document_type && (
              <ErrorMessage errorText={errors.document_type.message} />
            )}
            {errors.document_file && (
              <ErrorMessage errorText={errors.document_file.message} />
            )}

            <input
              type="hidden"
              {...register("document_file", {
                required: "Please upload a document",
              })}
            />
          </div>

          <div className="my-8">
            <h1 className="text-sm font-medium">Proof of Address</h1>

            <div>
              <select
                {...register("type", {
                  required: "Please select an address type",
                })}
                disabled={isUploadProof}
                className="mt-2 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none mb-5"
              >
                <option value="">Select Type</option>
                <option>Utility Bill</option>
                <option>Bank Statement</option>
                <option>Business Registration</option>
                <option>Business License</option>
                <option></option>
              </select>

              <FileUpload
                onFileSelect={(file) => {
                  setValue("document", file, { shouldValidate: true });
                }}
              />

              <input
                type="hidden"
                {...register("document", {
                  required: "Please upload a document",
                })}
              />
              {errors.type && <ErrorMessage errorText={errors.type.message} />}
              {errors.document && (
                <ErrorMessage errorText={errors.document.message} />
              )}
            </div>
          </div>

          <div>
            <h1 className="text-sm font-medium">Signature</h1>
            <p className="text-xs">Upload a clear sample of your signature.</p>

            <div className="mt-4">
              <FileUpload
                onFileSelect={(file) => {
                  setValue("signature", file, {
                    shouldValidate: true,
                  });
                }}
              />

              <input
                type="hidden"
                {...register("signature", {
                  required: "Please upload a document",
                })}
              />
            </div>
            {errors.signature && (
              <ErrorMessage errorText={errors.signature.message} />
            )}
          </div>

          <FormBtn>{isSubmitting ? "Submitting..." : "Submit"}</FormBtn>
        </form>
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmSubmit}
          isLoading={isSubmitting}
          title="Confirm Submission"
          message="Are you sure you want to submit your documents?"
          warningText="This information cannot be edited after submission."
          confirmText="Yes, Submit"
        />
      </div>
    </>
  );
}

export default UploadDocuments;
