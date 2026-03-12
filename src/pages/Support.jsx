import { HiEnvelope, HiPhone } from "react-icons/hi2";
import { Link } from "react-router-dom";
import Btn from "../components/Btn";
import { currentYear } from "../constants/helper";
import { useForm } from "react-hook-form";
import { useComplaints } from "../features/profile/useComplaints";
import ErrorMessage from "../components/ErrorMessage";
import SpinnerMini from "../components/SpinnerMini";
import { FaWhatsapp } from "react-icons/fa";

function Support() {
  const { complaints, isComplaints } = useComplaints();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    complaints(data, {
      onSettled: () => reset(),
    });
  };

  return (
    <div className="container-w">
      <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-5 lg:gap-10">
        <div className="border border-brand-75 px-5 py-8 rounded-2xl space-y-2">
          <h1 className="text-sm md:text-lg font-semibold">
            We&apos;re Always Available to Answer Your Questions
          </h1>
          <p className="text-xs">
            Whether you need support, have a quick inquiry, or just want to
            learn more about our services — our team is here for you, anytime.
          </p>

          <div className="flex items-center gap-2 mt-5">
            <HiPhone size={20} className="text-brand-400" />
            <div>
              <h2 className="font-medium text-xs">Phone Number</h2>
              <Link
                to="tel:0700700SAMTL"
                className="text-xs md:text-sm font-semibold"
              >
                0700-700-SAMTL
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <HiEnvelope size={20} className="text-brand-400" />
            <div>
              <h2 className="font-medium text-xs">Email Us</h2>
              <Link
                to="mailto:info@samtlng.com"
                className="text-xs md:text-sm font-semibold"
              >
                info@samtlng.com
              </Link>
            </div>
          </div>
          <Link
            to="https://wa.me/2349053887733"
            className="mt-2 inline-flex"
            target="_blank"
          >
            <span className="inline-flex items-center gap-2 chatWhatsapp px-3 py-2">
              <FaWhatsapp />
              <span className="text-xs whitespace-nowrap">
                Chat us on WhatsApp
              </span>
            </span>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-brand-75 px-5 py-8 rounded-2xl space-y-2"
        >
          <h1 className="text-sm md:text-lg font-semibold">
            Share your thoughts we are ready to listen
          </h1>
          <div>
            <label className="text-xs font-medium text-brand-850">Type</label>
            <select
              disabled={isComplaints}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-xs md:text-sm outline-none"
              {...register("type", {
                required: "Please select an option",
              })}
            >
              <option value="">Select</option>
              <option value="Complaint">Complaint</option>
              <option value="Suggestion">Suggestion</option>
              <option value="Enquiry">Enquiry</option>
            </select>
            {errors.type && <ErrorMessage errorText={errors.type.message} />}
          </div>

          <div>
            <label className="text-xs font-medium text-brand-850">
              Your Message
            </label>
            <textarea
              rows={5}
              disabled={isComplaints}
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message must be at least 10 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Message must not be more than 50 characters",
                },
              })}
            />
            {errors.message && (
              <ErrorMessage errorText={errors.message.message} />
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <Btn>{isComplaints ? <SpinnerMini /> : "Submit"}</Btn>
          </div>
        </form>
      </div>
      <div className="col-span-2 text-center text-xs text-gray-400 mt-10">
        &copy; {currentYear} SAMTL. All rights reserved.
      </div>
    </div>
  );
}

export default Support;
