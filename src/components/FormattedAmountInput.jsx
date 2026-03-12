import { Controller } from "react-hook-form";

function FormattedAmountInput({
  name,
  control,
  rules,
  disabled = false,
  placeholder = "Enter amount",
  className = "",
}) {
  const formatNumber = (value) => {
    if (!value && value !== 0) return "";

    const [integer, decimal] = value.toString().split(".");

    const formattedInteger = Number(integer).toLocaleString("en-NG");

    return decimal !== undefined
      ? `${formattedInteger}.${decimal}`
      : formattedInteger;
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <input
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          disabled={disabled}
          className={`mt-1 border block w-full rounded-md border-brand-825 p-2 text-sm outline-none ${className}`}
          value={formatNumber(field.value || "")}
          onChange={(e) => {
            let raw = e.target.value.replace(/,/g, "");

            // Allow only numbers and one dot
            if (!/^\d*\.?\d*$/.test(raw)) return;

            // Prevent more than 2 decimal places
            const parts = raw.split(".");
            if (parts[1]?.length > 2) return;

            field.onChange(raw);
          }}
          onBlur={field.onBlur}
        />
      )}
    />
  );
}

export default FormattedAmountInput;
