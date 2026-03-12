export const baseUrl = import.meta.env.VITE_BASE_URL;

export function capitalize(name) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

export function cleanToken(token) {
  return token.replace(/^"|"$/g, "");
}

export function formatAmount(amount = 0) {
  const value = Number(amount);
  if (isNaN(value)) return "0.00";

  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatedLongDate(rawDate) {
  const date = new Date(rawDate);

  const formatted = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formatted;
}

export function formatProductDescription(description = "") {
  // Title = everything before the first "("
  const title = description.split("(")[0].trim();

  // Code = text inside parentheses, with or without quotes
  const codeMatch = description.match(/\((?:"([^"]+)"|([^)]+))\)/);

  return {
    title,
    code: codeMatch?.[1] || codeMatch?.[2] || "",
  };
}

export function formatDate(dateStr) {
  const date = new Date(dateStr.replace(/-/g, " "));
  return date
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .replace(",", "");
}

export const formatAmountDigit = (value) => {
  const num = Number(value);

  if (Number.isNaN(num)) return value;

  return Number.isInteger(num) ? num : num.toFixed(2);
};

export const COMPLETED_STATUS = 3;
export const DOCUMENT_STATUS = 1;

export function isKycFullyCompleted(kyc) {
  if (!kyc) return false;

  const documentCompleted = [DOCUMENT_STATUS, COMPLETED_STATUS].includes(
    kyc.identity_document,
  );

  return (
    kyc.biodata === COMPLETED_STATUS &&
    kyc.bank === COMPLETED_STATUS &&
    kyc.next_of_kin === COMPLETED_STATUS &&
    documentCompleted
  );
}

export const isStepCompleted = (key, status) => {
  if (key === "identity_document") {
    return [DOCUMENT_STATUS, COMPLETED_STATUS].includes(status);
  }

  return status === COMPLETED_STATUS;
};

export const kycStatus = {
  biodata: 0,
  bank: 0,
  next_of_kin: 0,
  identity_document: 0,
};

export function formatNumber(value) {
  if (value == null || value === "") return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64String = reader.result.split(",")[1];
      resolve(base64String);
    };

    reader.onerror = reject;
  });
};

export const getCurrentDate = () => new Date().toISOString().split("T")[0];

export const generateDocumentNumber = () =>
  Math.random().toString(36).substring(2, 12).toUpperCase();

export function formattedName(name) {
  if (!name) return "";

  return String(name)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const currentYear = new Date().getFullYear();

export function formatDateLong(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatNaira(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amount);
}
