import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetSnippetCountQuery } from "../../redux/services/snippetsApi";
import { ApiErrorResponse, ApiResponse } from "../../configs/types";
import { Grid, Typography } from "@mui/material";
import { TEXT, TOAST_MSG } from "../../configs/constants";
import { setErrorToast } from "../../redux/features/toastSlice";
import { theme } from "../../theme/theme";

const SnippetCount = () => {
  const dispatch = useDispatch();
  const [snippetCountData, setSnippetCountData] = useState<any>(null);

  const snippetCountQuery = useGetSnippetCountQuery(null);

  useEffect(() => {
    if (snippetCountQuery.isSuccess) {
      const { data } = snippetCountQuery.data as ApiResponse;
      setSnippetCountData(data);
    }

    if (snippetCountQuery.isError) {
      const error =
        (snippetCountQuery.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    snippetCountQuery.isSuccess,
    snippetCountQuery.isError,
    snippetCountQuery.error,
    snippetCountQuery.data,
  ]);
  return (
    <Grid item xs={12} container justifyContent={"space-between"}>
      <Grid
        item
        xs={12}
        sm={5.9}
        sx={{ border: `1px solid ${theme.palette.primary.main}` }}
        p={2}
      >
        <Typography variant="body1" fontSize={"1.5rem"}>
          {TEXT.TOTAL_SNIPPETS}
        </Typography>
        <Typography variant="body2">
          {snippetCountData?.totalCount ?? 0}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={5.9}
        sx={{ border: `1px solid ${theme.palette.primary.main}` }}
        p={2}
        mt={{ xs: 1, sm: "auto" }}
      >
        <Typography variant="body1" fontSize={"1.5rem"}>
          {TEXT.FAVORITE_SNIPPETS}
        </Typography>
        <Typography variant="body2">
          {snippetCountData?.favoriteSnippetCount ?? 0}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SnippetCount;
