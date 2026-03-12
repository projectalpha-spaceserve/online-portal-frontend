import { useEffect, useRef, useState } from "react";
import { useSearch } from "../hooks/useSearch";
import ErrorMessage from "./ErrorMessage";

function SearchableSelect({
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  fieldName, // the actual form field (e.g. "lga")
  extraFields = [], // 👈 optional additional fields to set
  register,
  setValue,
  watch,
  errors,
  options = [],
  searchKeys = [], // 👈 keys for search hook
  getOptionLabel,
  getOptionValue,
  isLoading = false,
  error,
  disabled = false,
  className,
}) {
  const containerRef = useRef(null);

  // ✅ Use YOUR hook
  const { query, setQuery, filteredData } = useSearch(options, searchKeys);

  const selectedValue = watch(fieldName);

  const selectedOption = options.find(
    (opt) => getOptionValue(opt) === selectedValue,
  );

  const [open, setOpen] = useState(false);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (item) => {
    // ✅ Set main field (usually ID / code)
    setValue(fieldName, getOptionValue(item), {
      shouldValidate: true,
    });

    // ✅ Set extra fields if provided
    extraFields.forEach(({ name, value }) => {
      setValue(name, value(item));
    });

    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative mb-3">
      <label className="text-xs font-medium text-brand-850">{label}</label>

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={disabled || isLoading}
        className={`mt-1 w-full rounded-md border border-brand-825 p-2 text-left text-sm ${className}`}
      >
        {selectedOption ? getOptionLabel(selectedOption) : placeholder}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-b p-2 text-sm outline-none"
            autoFocus
          />

          <ul className="max-h-56 overflow-y-auto">
            {filteredData.map((item, i) => (
              <li
                key={i}
                onClick={() => handleSelect(item)}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              >
                {getOptionLabel(item)}
              </li>
            ))}

            {(filteredData.length === 0 || error) && (
              <li className="px-3 py-2 text-sm text-gray-500">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Hidden registered input (this is what gets submitted) */}
      <input
        type="hidden"
        {...register(fieldName, {
          required: `Please select your ${label ? label : fieldName}`,
        })}
      />

      {errors?.[fieldName] && (
        <ErrorMessage errorText={errors[fieldName].message} />
      )}
    </div>
  );
}

export default SearchableSelect;
