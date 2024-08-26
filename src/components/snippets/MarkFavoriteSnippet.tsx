import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CircularProgress, IconButton } from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";

import { ApiErrorResponse } from "../../configs/types";
import { TOAST_MSG } from "../../configs/constants";
import { setErrorToast } from "../../redux/features/toastSlice";
import {
  useMarkFavoriteMutation,
  useMarkUnfavoriteMutation,
} from "../../redux/services/snippetsApi";

const MarkFavoriteSnippet = ({
  isFavorite,
  id,
}: {
  isFavorite: boolean;
  id: string;
}) => {
  const dispatch = useDispatch();

  const [markFavorite, markFavoriteResponse] = useMarkFavoriteMutation();
  const [unmarkFavorite, unmarkFavoriteResponse] = useMarkUnfavoriteMutation();

  const addToFavorite = async () => {
    await markFavorite({ id });
  };

  const removeFromFavorite = async () => {
    await unmarkFavorite({ id });
  };

  useEffect(() => {
    if (markFavoriteResponse.isError || unmarkFavoriteResponse.isError) {
      const error =
        (markFavoriteResponse.error as ApiErrorResponse)?.data?.message ||
        (unmarkFavoriteResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    markFavoriteResponse.error,
    markFavoriteResponse.isError,
    unmarkFavoriteResponse.error,
    unmarkFavoriteResponse.isError,
  ]);

  if (markFavoriteResponse.isLoading || unmarkFavoriteResponse.isLoading) {
    return (
      <IconButton sx={{ pointerEvents: "none" }}>
        <CircularProgress size={24} />
      </IconButton>
    );
  }

  return isFavorite ? (
    <IconButton aria-label="add to favorites" onClick={removeFromFavorite}>
      <FavoriteIcon color="primary" />
    </IconButton>
  ) : (
    <IconButton aria-label="remove from favorites" onClick={addToFavorite}>
      <FavoriteIcon />
    </IconButton>
  );
};

export default MarkFavoriteSnippet;
