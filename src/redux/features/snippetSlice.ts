import { createSlice } from "@reduxjs/toolkit";

export interface SnippetState {
  snippetForm: boolean;
  snippetQuery: string;
  isEdit: boolean;
  snippetId: string;
}

const initialState: SnippetState = {
  snippetForm: false,
  snippetQuery: "",
  isEdit: false,
  snippetId: "",
};

export const snippetSlice = createSlice({
  name: "snippet",
  initialState,
  reducers: {
    setSnippetForm: (state, action) => {
      state.snippetForm = action.payload;
    },
    setSnippetQuery: (state, action) => {
      state.snippetQuery = action.payload;
    },
    setEditSnippet: (state, action) => {
      state.isEdit = action.payload.isEdit;
      state.snippetId = action.payload.id;
    },
  },
});

export const { setSnippetForm, setSnippetQuery, setEditSnippet } =
  snippetSlice.actions;

export default snippetSlice.reducer;
