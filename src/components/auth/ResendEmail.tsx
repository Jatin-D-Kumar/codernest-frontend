import { Button, Container, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useResendEmailVerificationMutation } from "../../redux/services/authApi";
import { Email } from "@mui/icons-material";
import { CLICK_TEXT, MESSAGE, TOAST_MSG } from "../../configs/constants";
import { PUBLIC_ROUTES } from "../../configs/enums";
import LoadingButton from "../../styledComponents/LoadingButton";
import { useEffect } from "react";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/features/userSlice";
import { ApiErrorResponse } from "../../configs/types";

const ResendEmail = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userData);

  const [resendEmail, resendEmailResponse] =
    useResendEmailVerificationMutation();

  const handleResendEmail = async () => {
    await resendEmail(null);
  };

  useEffect(() => {
    if (resendEmailResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.EMAIL_SENT_SUCCESS));
    }
    if (resendEmailResponse.isError) {
      const errorMessage =
        (resendEmailResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(errorMessage));
    }
  }, [dispatch, resendEmailResponse]);

  const handleBackToLogin = () => {
    dispatch(logout());
    navigate(PUBLIC_ROUTES.LOGIN);
  };

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
          alignItems: "center",
          gap: 1,
        }}
      >
        <Email color="primary" fontSize="large" />
        <Typography variant="h5">{MESSAGE.VERIFY_EMAIL_ADDRESS}</Typography>
        <Typography variant="body2">
          {MESSAGE.VERIFY_EMAIL_MESSAGE_1.replace("{}", user.email)}
        </Typography>
        <Typography variant="body2">
          {MESSAGE.VERIFY_EMAIL_MESSAGE_2}
        </Typography>
        <Typography variant="body2">
          {MESSAGE.VERIFY_EMAIL_MESSAGE_3}
        </Typography>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
          <Button
            type="button"
            size="small"
            variant="outlined"
            onClick={handleBackToLogin}
          >
            {CLICK_TEXT.BACK_TO_LOGIN}
          </Button>
          <LoadingButton
            type="submit"
            size="small"
            variant="contained"
            loading={resendEmailResponse.isLoading}
            onClick={handleResendEmail}
          >
            {CLICK_TEXT.RESEND_EMAIL}
          </LoadingButton>
        </Stack>
      </Container>
    </Container>
  );
};

export default ResendEmail;
