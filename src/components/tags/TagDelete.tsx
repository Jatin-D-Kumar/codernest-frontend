import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";

import { TOAST_MSG } from "../../configs/constants";
import { ApiErrorResponse } from "../../configs/types";
import { useDeleteTagMutation } from "../../redux/services/tagsApi";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";

const TagDelete = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const [deleteTag, deleteTagResponse] = useDeleteTagMutation();

  const handleDeleteTag = async () => {
    await deleteTag({ id });
  };

  useEffect(() => {
    if (deleteTagResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.TAG_DELETE_SUCCESS));
    }
    if (deleteTagResponse.isError) {
      const error =
        (deleteTagResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    deleteTagResponse.error,
    deleteTagResponse.isError,
    deleteTagResponse.isSuccess,
  ]);

  if (deleteTagResponse.isLoading) {
    return (
      <IconButton sx={{ pointerEvents: "none" }}>
        <CircularProgress size={24} />
      </IconButton>
    );
  }
  return (
    <IconButton aria-label="delete" onClick={handleDeleteTag}>
      <DeleteIcon />
    </IconButton>
  );
};

export default TagDelete;
