import { Stack, useTheme } from "@mui/material";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  TEXT,
  MESSAGE,
  CLICK_TEXT,
  FIELD_NAME,
  LABEL,
  TOAST_MSG,
} from "../../configs/constants";
import { PUBLIC_ROUTES } from "../../configs/enums";
import FormikTextField from "../../styledComponents/FormikTextField";
import LoadingButton from "../../styledComponents/LoadingButton";
import { FormikHelpers, useFormik } from "formik";
import { useResetPasswordMutation } from "../../redux/services/authApi";
import { resetPasswordSchema } from "../../schemas/resetPassword";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import { ApiErrorResponse } from "../../configs/types";

const ResetPassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [resetPassword, resetPasswordResponse] = useResetPasswordMutation();

  const handleSubmit = async (
    values: {
      newPassword: string;
    },
    formikHelpers: FormikHelpers<{
      newPassword: string;
    }>
  ): Promise<void | Promise<any>> => {
    await resetPassword({ ...values, token: params?.token });
    navigate(PUBLIC_ROUTES.LOGIN);
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
    },
    validationSchema: resetPasswordSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (resetPasswordResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.RESET_PASSWORD_SUCCESS));
    }
    if (resetPasswordResponse.isError) {
      const error =
        (resetPasswordResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    resetPasswordResponse,
    resetPasswordResponse.isError,
    resetPasswordResponse.isSuccess,
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          color="primary"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          {TEXT.RESET_PASSWORD}
        </Typography>
        <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, mb: 2 }}>
          {MESSAGE.NEW_PASSWORD}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
              onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
            >
              {CLICK_TEXT.BACK_TO_LOGIN}
            </Button>
            <LoadingButton
              type="submit"
              size="small"
              variant="contained"
              loading={resetPasswordResponse.isLoading}
            >
              {CLICK_TEXT.RESET}
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </Container>
  );
};

export default ResetPassword;
