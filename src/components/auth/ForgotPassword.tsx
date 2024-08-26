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
import { useForgotPasswordMutation } from "../../redux/services/authApi";
import { FormikHelpers, useFormik } from "formik";
import { forgotPasswordSchema } from "../../schemas/forgotPassword";
import { useEffect } from "react";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import LoadingButton from "../../styledComponents/LoadingButton";
import { useNavigate } from "react-router-dom";
import { PUBLIC_ROUTES } from "../../configs/enums";
import { ApiErrorResponse } from "../../configs/types";

const ForgotPassword = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [forgotPassword, forgotPasswordResponse] = useForgotPasswordMutation();

  const handleSubmit = async (
    values: {
      email: string;
    },
    formikHelpers: FormikHelpers<{
      email: string;
    }>
  ): Promise<void | Promise<any>> => {
    await forgotPassword(values);
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (forgotPasswordResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.FORGOT_PASSWORD_SUCCESS));
    }
    if (forgotPasswordResponse.isError) {
      const error =
        (forgotPasswordResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    forgotPasswordResponse,
    forgotPasswordResponse.isError,
    forgotPasswordResponse.isSuccess,
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
          {TEXT.RECOVER_ACCOUNT}
        </Typography>
        <Typography
          color="primary"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          {MESSAGE.FORGOT_YOUR_PASSWORD}
        </Typography>
        <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, mb: 2 }}>
          {MESSAGE.FORGOT_PASSWORD_MESSAGE}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormikTextField
            type="text"
            id={FIELD_NAME.EMAIL}
            name={FIELD_NAME.EMAIL}
            label={LABEL.ENTER_YOUR_EMAIL}
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
              loading={forgotPasswordResponse.isLoading}
            >
              {CLICK_TEXT.SEND_RESET_LINK}
            </LoadingButton>
          </Stack>
        </form>
      </Container>
    </Container>
  );
};

export default ForgotPassword;
