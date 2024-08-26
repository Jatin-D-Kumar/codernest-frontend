import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Typography, Divider, useTheme } from "@mui/material";

import { TEXT, TOAST_MSG } from "../../configs/constants";
import { ApiResponse, ApiErrorResponse } from "../../configs/types";
import { setErrorToast } from "../../redux/features/toastSlice";
import { useGetUserLanguagesQuery } from "../../redux/services/snippetsApi";

const LanguageList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [userLanguages, setUserLanguages] = useState<any[]>([]);

  const getUserLanguageQuery = useGetUserLanguagesQuery(null);

  useEffect(() => {
    if (getUserLanguageQuery.isSuccess) {
      const { data } = getUserLanguageQuery.data as ApiResponse;
      setUserLanguages(data);
    }

    if (getUserLanguageQuery.isError) {
      const error =
        (getUserLanguageQuery.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    getUserLanguageQuery.isSuccess,
    getUserLanguageQuery.isError,
    getUserLanguageQuery.error,
    dispatch,
    getUserLanguageQuery.data,
  ]);

  return (
    <Grid item container xs={12}>
      <Grid item xs={12} my={1}>
        <Typography variant="body1" fontSize={"1.5rem"}>
          {TEXT.LANGUAGES}
        </Typography>
      </Grid>
      <Divider sx={{ width: "100%", mb: 1 }} />
      <Grid item container xs={12} my={1} justifyContent={"space-evenly"}>
        {userLanguages.map((language: any) => (
          <Grid
            item
            xs={12}
            sm={5.9}
            md={3.9}
            lg={2.9}
            xl={1.9}
            sx={{ border: `1px solid ${theme.palette.primary.main}` }}
            p={2}
            mt={1}
          >
            <Typography variant="body1">{language.title}</Typography>
            <Typography variant="body2">{language.count}</Typography>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default LanguageList;
