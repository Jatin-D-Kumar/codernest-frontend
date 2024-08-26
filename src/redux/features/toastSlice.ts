import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ToastState {
  open: boolean;
  severity: "success" | "info" | "warning" | "error";
  message: string;
}

const initialState: ToastState = {
  open: false,
  severity: "success",
  message: "",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setSuccessToast: (state, action) => {
      state.message = action.payload;
      state.severity = "success";
      state.open = true;
    },
    setInfoToast: (state, action) => {
      state.message = action.payload;
      state.severity = "info";
      state.open = true;
    },
    setWarningToast: (state, action) => {
      state.message = action.payload;
      state.severity = "warning";
      state.open = true;
    },
    setErrorToast: (state, action) => {
      state.message = action.payload;
      state.severity = "error";
      state.open = true;
    },
    closeToast: (state) => {
      state.message = "";
      state.open = false;
    },
  },
});

export const getToastState = (state: RootState) => state.toast;

export const {
  setSuccessToast,
  setInfoToast,
  setWarningToast,
  setErrorToast,
  closeToast,
} = toastSlice.actions;

export default toastSlice.reducer;
