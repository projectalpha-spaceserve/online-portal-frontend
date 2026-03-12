import { useState, useCallback } from "react";
import ConfirmModal from "../components/ConfirmModal";

export function useConfirm() {
  const [options, setOptions] = useState(null);
  const [resolver, setResolver] = useState(null);

  const confirm = useCallback((modalOptions) => {
    return new Promise((resolve) => {
      setOptions(modalOptions);
      setResolver(() => resolve);
    });
  }, []);

  const handleClose = () => {
    resolver?.(false);
    setOptions(null);
  };

  const handleConfirm = () => {
    resolver?.(true);
    setOptions(null);
  };

  const ConfirmComponent = options ? (
    <ConfirmModal
      isOpen={true}
      onClose={handleClose}
      onConfirm={handleConfirm}
      {...options}
    />
  ) : null;

  return Object.assign(confirm, { ConfirmComponent });
}
