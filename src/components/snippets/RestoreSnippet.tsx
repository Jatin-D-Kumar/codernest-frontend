import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress, IconButton } from "@mui/material";
import { RestoreFromTrash as RestoreIcon } from "@mui/icons-material";

import { ApiErrorResponse } from "../../configs/types";
import { TOAST_MSG } from "../../configs/constants";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import { useRestoreFromTrashMutation } from "../../redux/services/snippetsApi";

const RestoreSnippet = ({ id }: { id: string }) => {
  const dispatch = useDispatch();

  const [restoreFromTrash, restoreFromTrashResponse] =
    useRestoreFromTrashMutation();

  const restoreSnippetFromTrash = async () => {
    await restoreFromTrash({ id });
  };

  useEffect(() => {
    if (restoreFromTrashResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.SNIPPET_RESTORED_SUCCESS));
    }
    if (restoreFromTrashResponse.isError) {
      const error =
        (restoreFromTrashResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    restoreFromTrashResponse.error,
    restoreFromTrashResponse.isError,
    restoreFromTrashResponse.isSuccess,
  ]);

  if (restoreFromTrashResponse.isLoading) {
    return (
      <IconButton sx={{ pointerEvents: "none" }}>
        <CircularProgress size={24} />
      </IconButton>
    );
  }

  return (
    <IconButton
      aria-label="Restore"
      sx={{ mr: 1 }}
      onClick={restoreSnippetFromTrash}
    >
      <RestoreIcon />
    </IconButton>
  );
};

export default RestoreSnippet;
