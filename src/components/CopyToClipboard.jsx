import { useState } from "react";
import { BiSolidCopy, BiCheck } from "react-icons/bi";

function CopyToClipboard({ text, className = "" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`flex items-center gap-1 cursor-pointer text-brand-425 hover:opacity-80 transition ${className}`}
    >
      {copied ? (
        <>
          <BiCheck size={20} className="text-green-600" />
        </>
      ) : (
        <>
          <BiSolidCopy />
        </>
      )}
    </button>
  );
}

export default CopyToClipboard;
