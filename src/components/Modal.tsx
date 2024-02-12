import { forwardRef, useImperativeHandle, useRef } from "react";

interface DialogProps {
  message: string;
}
interface DialogRef {
  openDialog: () => void;
  closeDialog: () => void;
}
const Modal = forwardRef<DialogRef, DialogProps>(({ message }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    openDialog: () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    },
    closeDialog: () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    },
  }));
  return <dialog ref={dialogRef}>{message}</dialog>;
});

export default Modal;
