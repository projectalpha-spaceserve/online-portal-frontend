import { useRef, useState } from "react";
import { HiArrowUpOnSquare } from "react-icons/hi2";
import { IoCheckboxSharp } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";

function FileUpload({
  accept = "image/png,image/jpeg,application/pdf",
  maxSizeMB = 2,
  onFileSelect,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const maxSize = maxSizeMB * 1024 * 1024;

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (selectedFile.size > maxSize) {
      setError(`File must be less than ${maxSizeMB}MB`);
      return;
    }

    setError("");
    setFile(selectedFile);
    onFileSelect?.(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const removeFile = () => {
    setFile(null);
    inputRef.current.value = "";
    onFileSelect?.(null);
  };

  return (
    <div>
      <div
        onClick={() => !file && inputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-4 text-center transition
        ${
          file
            ? "border-green-500 bg-green-50"
            : isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-brand-75 bg-white"
        }`}
      >
        {!file ? (
          <>
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-75 border-dotted bg-white shadow">
                <HiArrowUpOnSquare size={18} />
              </div>

              <p className="text-xs">
                <span className="text-brand-400 font-medium">
                  Click to upload
                </span>{" "}
                or drag and drop
              </p>

              <p className="text-xs text-gray-500">
                PNG, JPG, PDF : max({maxSizeMB}mb)
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-sm font-medium text-green-700">
                <IoCheckboxSharp size={20} className="inline mr-1" />{" "}
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              className="text-sm tex cursor-pointer rounded-md bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
            >
              <RiDeleteBin6Line size={18} />
            </button>
          </div>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}

export default FileUpload;
