import { useState } from "react";
import { useForm } from "react-hook-form";
import Btn from "../../components/Btn";
import BtnOutline from "../../components/BtnOutline";
import ConfirmModal from "../../components/ConfirmModal";
import ErrorMessage from "../../components/ErrorMessage";
import { useCreateSecurityQuestion } from "./useSecurityQuestion";
import { useSecurityQuestions } from "./useSecurityQuestions";

function Questions() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState(null);
  const { isSecurityQuestionsPending, securityQuestions } =
    useSecurityQuestions();
  const { createSecurityQuestion, isCreatingSecurityQuestion } =
    useCreateSecurityQuestion();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const selected1 = watch("question1_id");
  const selected2 = watch("question2_id");
  const selected3 = watch("question3_id");

  const onSubmit = (data) => {
    const payload = {
      data: [
        {
          question_id: data.question1_id,
          answer: data.answer1,
        },
        {
          question_id: data.question2_id,
          answer: data.answer2,
        },
        {
          question_id: data.question3_id,
          answer: data.answer3,
        },
      ],
    };

    setPendingData(payload);
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    if (!pendingData) return;

    createSecurityQuestion(pendingData, {
      onSettled: () => {
        reset();
        setShowConfirmModal(false);
        setPendingData(null);
      },
    });
  };

  return (
    <div>
      <h1 className="font-semibold text-lg">Create your Security Questions</h1>
      <p className="text-xs mb-4 pt-1">
        Set Up Security Questions to Keep Your account Safe
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Security Question 1
            </label>

            <select
              {...register("question1_id", {
                required: "Please select a security question",
              })}
              disabled={
                isCreatingSecurityQuestion || isSecurityQuestionsPending
              }
              className="border border-brand-75 block text-sm p-2 w-full rounded-md mt-1"
            >
              <option></option>
              {securityQuestions.map((item, i) => (
                <option
                  key={i}
                  value={item.id}
                  disabled={item.id === selected2 || item.id === selected3}
                >
                  {item.question}
                </option>
              ))}
            </select>
            {errors.question1_id && (
              <ErrorMessage errorText={errors.question1_id.message} />
            )}
          </div>
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Security Answer
            </label>
            <input
              type="text"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("answer1", {
                required: "Please enter security answer",
              })}
              disabled={isCreatingSecurityQuestion}
            />
            {errors.answer1 && (
              <ErrorMessage errorText={errors.answer1.message} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Security Question 2
            </label>

            <select
              {...register("question2_id", {
                required: "Please select a security question",
              })}
              disabled={
                isCreatingSecurityQuestion || isSecurityQuestionsPending
              }
              className="border border-brand-75 block text-sm p-2 w-full rounded-md mt-1"
            >
              <option></option>
              {securityQuestions.map((item, i) => (
                <option
                  key={i}
                  value={item.id}
                  disabled={item.id === selected1 || item.id === selected3}
                >
                  {item.question}
                </option>
              ))}
            </select>
            {errors.question2_id && (
              <ErrorMessage errorText={errors.question2_id.message} />
            )}
          </div>
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Security Answer
            </label>
            <input
              type="text"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("answer2", {
                required: "Please enter security answer",
              })}
              disabled={isCreatingSecurityQuestion}
            />
            {errors.answer2 && (
              <ErrorMessage errorText={errors.answer2.message} />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8">
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Security Question 2
            </label>

            <select
              {...register("question3_id", {
                required: "Please select a security question",
              })}
              disabled={
                isCreatingSecurityQuestion || isSecurityQuestionsPending
              }
              className="border border-brand-75 block text-sm p-2 w-full rounded-md mt-1"
            >
              <option></option>
              {securityQuestions.map((item, i) => (
                <option
                  key={i}
                  value={item.id}
                  disabled={item.id === selected1 || item.id === selected2}
                >
                  {item.question}
                </option>
              ))}
            </select>
            {errors.question3_id && (
              <ErrorMessage errorText={errors.question3_id.message} />
            )}
          </div>
          <div className="">
            <label className="text-xs font-medium text-brand-850">
              Security Answer
            </label>
            <input
              type="text"
              className="mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none"
              {...register("answer3", {
                required: "Please enter security answer",
              })}
              disabled={isCreatingSecurityQuestion}
            />
            {errors.answer3 && (
              <ErrorMessage errorText={errors.answer3.message} />
            )}
          </div>
        </div>

        <div className="flex gap-5 items-center justify-end pt-5">
          <BtnOutline onClick={() => reset()}>Cancel</BtnOutline>
          <Btn disabled={isCreatingSecurityQuestion}>
            {isCreatingSecurityQuestion ? "Submitting..." : "Submit"}
          </Btn>
        </div>
      </form>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmSubmit}
        isLoading={isCreatingSecurityQuestion}
        title="Confirm Submission"
        message="Are you sure you want to submit your security questions?"
        warningText="This information cannot be edited after submission."
        confirmText="Yes, Submit"
      />
    </div>
  );
}

export default Questions;
