import { Button, Container, Stack, Typography, useTheme } from "@mui/material";
import {
  CLICK_TEXT,
  FIELD_NAME,
  LABEL,
  MESSAGE,
  TEXT,
  TOAST_MSG,
} from "../../configs/constants";
import FormikTextField from "../../styledComponents/FormikTextField";
import { useDispatch } from "react-redux";
import { useChangePasswordMutation } from "../../redux/services/authApi";
import { FormikHelpers, useFormik } from "formik";
import { useEffect } from "react";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import LoadingButton from "../../styledComponents/LoadingButton";
import { useNavigate } from "react-router-dom";
import { ApiErrorResponse } from "../../configs/types";
import { changePasswordSchema } from "../../schemas/changePassword";

const ChangePassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [changePassword, changePasswordResponse] = useChangePasswordMutation();

  const handleSubmit = async (
    values: {
      oldPassword: string;
      newPassword: string;
    },
    formikHelpers: FormikHelpers<{
      oldPassword: string;
      newPassword: string;
    }>
  ): Promise<void | Promise<any>> => {
    await changePassword(values);
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: changePasswordSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (changePasswordResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.PASSWORD_UPDATE_SUCCESS));
      navigate(-1);
    }
    if (changePasswordResponse.isError) {
      const error =
        (changePasswordResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    navigate,
    changePasswordResponse,
    changePasswordResponse.isError,
    changePasswordResponse.isSuccess,
  ]);

  return (
    <Container
      sx={{
        minWidth: "100%",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth={"xs"}
        sx={{
          bgcolor: theme.palette.text.primary,
          p: 2,
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <Typography sx={{ fontSize: "0.75rem", lineHeight: 1.2 }}>
          {TEXT.UPDATE_PASSWORD}
        </Typography>
        <Typography
          color="primary"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          {TEXT.CHANGE_PASSWORD}
        </Typography>
        <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, mb: 2 }}>
          {MESSAGE.CHANGE_PASSWORD}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormikTextField
            type="password"
            id={FIELD_NAME.OLD_PASSWORD}
            name={FIELD_NAME.OLD_PASSWORD}
            label={LABEL.OLD_PASSWORD}
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            formik={formik}
          />
          <FormikTextField
            type="password"
            id={FIELD_NAME.NEW_PASSWORD}
            name={FIELD_NAME.NEW_PASSWORD}
            label={LABEL.NEW_PASSWORD}
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            formik={formik}
          />
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Button
              type="button"
              size="small"
              variant="outlined"
              onClick={() => navigate(-1)}
            >
              {CLICK_TEXT.BACK}
            </Button>
            <LoadingButton
              type="submit"
              size="small"
              variant="contained"
              loading={changePasswordResponse.isLoading}
            >
              {CLICK_TEXT.UPDATE_PASSWORD}
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </Container>
  );
};

export default ChangePassword;
