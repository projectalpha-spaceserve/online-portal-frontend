import { useRef, useState } from "react";

function OtpInput({ length = 6, onChange, disabled }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  function handleChange(value, index) {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    const combined = newOtp.join("");
    onChange?.(combined);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleBackspace(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex justify-between gap-2 mt-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          disabled={disabled}
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleBackspace(e, index)}
          className="w-12 h-12 text-center border rounded-md border-brand-825 text-lg outline-none"
        />
      ))}
    </div>
  );
}

export default OtpInput;
