import { createSlice } from "@reduxjs/toolkit";

export interface NavbarState {
  open: boolean;
}

const initialState: NavbarState = {
  open: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavbar: (state) => {
      state.open = !state.open;
    },
  },
});

export const { setNavbar } = navbarSlice.actions;

export default navbarSlice.reducer;
