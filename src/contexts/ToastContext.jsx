import { createContext, useState } from "react";
import SnackBar from "../components/SnackBar";

export const ToastContext = createContext({});
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(msg) {
    setOpen(true);
    setMessage(msg);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <>
      <ToastContext.Provider value={showHideToast}>
        <SnackBar open={open} message={message} />
        {children}
      </ToastContext.Provider>
    </>
  );
};
