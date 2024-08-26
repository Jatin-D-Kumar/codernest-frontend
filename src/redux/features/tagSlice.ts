import { createSlice } from "@reduxjs/toolkit";
import { Tag } from "../../configs/types";

export interface TagState {
  tagForm: boolean;
  tagValue: string;
  tagList: Tag[];
  isEdit: boolean;
  tag: Tag;
}

const initialState: TagState = {
  tagForm: false,
  tagValue: "",
  tagList: [],
  isEdit: false,
  tag: { id: "", name: "" },
};

export const TagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTagForm: (state, action) => {
      state.tagForm = action.payload;
    },
    setTagValue: (state, action) => {
      state.tagValue = action.payload;
    },
    setTagList: (state, action) => {
      state.tagList = action.payload;
    },
    setEditTag: (state, action) => {
      state.isEdit = action.payload.isEdit;
      state.tag = action.payload.tag;
    },
  },
});

export const { setTagForm, setTagValue, setTagList, setEditTag } =
  TagSlice.actions;

export default TagSlice.reducer;
