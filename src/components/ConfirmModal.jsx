import Modal from "./Modal";
import SpinnerMini from "./SpinnerMini";

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message,
  warningText,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isLoading = false,
  variant = "primary", // primary | danger
}) {
  if (!isOpen) return null;

  const confirmStyles =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-brand-400 hover:bg-brand-500";

  return (
    <Modal onClose={onClose}>
      <div className="px-6 mt-5">
        <h2 className="text-lg font-semibold mb-3">{title}</h2>

        {message && <p className="text-sm text-gray-600 mb-2">{message}</p>}

        {warningText && (
          <p className="text-sm font-medium text-brand-400 mb-6">
            {warningText}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border text-sm"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white text-sm ${confirmStyles}`}
          >
            {isLoading ? <SpinnerMini /> : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
