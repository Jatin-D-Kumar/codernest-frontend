import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { closeToast, getToastState } from "../../redux/features/toastSlice";

const Toaster = () => {
  const { open, message, severity } = useSelector(getToastState);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeToast());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%", color: "white" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
