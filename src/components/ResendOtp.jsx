import { useEffect, useState } from "react";

function ResendOtp({ onResend, isLoading, seconds = 60 }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  function handleClick() {
    if (timeLeft > 0) return;

    onResend?.();
    setTimeLeft(seconds);
  }

  return (
    <div className="mt-3 text-sm">
      <button
        type="button"
        onClick={handleClick}
        disabled={timeLeft > 0 || isLoading}
        className={`${
          timeLeft > 0
            ? "text-gray-400 cursor-not-allowed"
            : "text-brand-400 font-medium cursor-pointer"
        }`}
      >
        {timeLeft > 0 ? `Resend OTP in ${timeLeft}s` : "Resend OTP"}
      </button>
    </div>
  );
}

export default ResendOtp;
