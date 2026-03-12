import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Btn from "../../components/Btn";
import ErrorMessage from "../../components/ErrorMessage";
import FileUpload from "../../components/FileUpload";
import { convertToBase64 } from "../../constants/helper";
import { useUploadSignature } from "../get-started/kyc/useUploadSignature";

function Signature() {
  const { uploadSignature, isUploadSignature } = useUploadSignature();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      // 3️⃣ Upload Signature
      if (data.signature) {
        const base64Signature = await convertToBase64(data.signature);

        await uploadSignature({
          signature: base64Signature,
        });
      }

      toast.success("Signature uploaded successfully!");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1 className="font-semibold text-lg mb-4">Signature</h1>
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
        <div className="flex gap-5 items-center justify-end pt-5">
          <Btn disabled={isUploadSignature}>
            {isUploadSignature ? "Submitting..." : "Submit"}
          </Btn>
        </div>
      </form>
    </div>
  );
}

export default Signature;
