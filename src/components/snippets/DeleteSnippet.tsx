import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress, IconButton } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

import { ApiErrorResponse } from "../../configs/types";
import { TOAST_MSG } from "../../configs/constants";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import {
  useDeleteSnippetMutation,
  useMoveToTrashMutation,
} from "../../redux/services/snippetsApi";

const DeleteSnippet = ({
  isDeleted,
  id,
}: {
  isDeleted: boolean;
  id: string;
}) => {
  const dispatch = useDispatch();

  const [moveToTrash, moveToTrashResponse] = useMoveToTrashMutation();
  const [deleteSnippet, deleteSnippetResponse] = useDeleteSnippetMutation();

  const moveSnippetToTrash = async () => {
    await moveToTrash({ id });
  };

  const deleteSnippetFromTrash = async () => {
    await deleteSnippet({ id });
  };

  useEffect(() => {
    if (moveToTrashResponse.isSuccess || deleteSnippetResponse.isSuccess) {
      dispatch(
        setSuccessToast(
          isDeleted
            ? TOAST_MSG.SNIPPET_DELETED_SUCCESS
            : TOAST_MSG.SNIPPET_TRASH_SUCCESS
        )
      );
    }
    if (moveToTrashResponse.isError || deleteSnippetResponse.isError) {
      const error =
        (moveToTrashResponse.error as ApiErrorResponse)?.data?.message ||
        (deleteSnippetResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    isDeleted,
    deleteSnippetResponse.error,
    deleteSnippetResponse.isError,
    deleteSnippetResponse.isSuccess,
    moveToTrashResponse.error,
    moveToTrashResponse.isError,
    moveToTrashResponse.isSuccess,
  ]);

  if (moveToTrashResponse.isLoading || deleteSnippetResponse.isLoading) {
    return (
      <IconButton sx={{ pointerEvents: "none" }}>
        <CircularProgress size={24} />
      </IconButton>
    );
  }

  return (
    <IconButton
      aria-label="Delete"
      sx={{ mr: 1 }}
      onClick={isDeleted ? deleteSnippetFromTrash : moveSnippetToTrash}
    >
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteSnippet;
