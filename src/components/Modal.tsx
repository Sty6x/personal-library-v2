import { useEffect, useRef } from "react";

type DialogProps = {
  message: string;
  isOpen: boolean;
  modalSetter: React.Dispatch<React.SetStateAction<boolean>>;
};
const Modal = ({ message, modalSetter, isOpen }: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      return;
    }
  }, [isOpen]);

  return (
    <dialog
      onClose={() => {
        console.log("closed");
        modalSetter(false);
      }}
      ref={dialogRef}
    >
      {message}
    </dialog>
  );
};

export default Modal;
