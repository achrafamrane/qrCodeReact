import React, { useState, useRef, useContext, createContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";

// Create Context
const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmServiceProvider = ({ children }) => {
  const [options, setOptions] = useState(null);
  const awaitingPromiseRef = useRef(null);

  const openModal = options => {
    setOptions(options);
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject };
    });
  };

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject();
    }
    setOptions(null);
  };

  const handleConfirm = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve();
    }
    setOptions(null);
  };

  return (
    <>
      <ConfirmContext.Provider value={openModal} children={children} />

      <Dialog open={Boolean(options)}>
        <DialogTitle>
          {options && options.title ? options.title : ""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleConfirm}>
            Yes, I agree
          </Button>
          <Button color="primary" onClick={handleClose} autoFocus>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
