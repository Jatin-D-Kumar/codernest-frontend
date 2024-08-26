import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { CLICK_TEXT, MESSAGE, TEXT } from "../../configs/constants";
import { PUBLIC_ROUTES } from "../../configs/enums";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailQuery } from "../../redux/services/authApi";
import { useEffect } from "react";

const EmailVerfication = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const params = useParams();

  const { isSuccess, isLoading, isError, error } = useVerifyEmailQuery({
    token: params?.token,
  });

  useEffect(() => {
    if (isError) {
      console.log((error as any)?.data?.message);
    }
  }, [error, isError]);

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
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} color="primary" />
        ) : (
          <>
            {isSuccess ? (
              <CheckCircle color="primary" fontSize="large" />
            ) : (
              <Cancel color="primary" fontSize="large" />
            )}
            {isSuccess && (
              <Typography variant="h5" my={1}>
                {TEXT.VERIFIED}
              </Typography>
            )}
            <Typography variant="body2" mt={isSuccess ? "auto" : 1} mb={1}>
              {isSuccess
                ? MESSAGE.EMAIL_VERIFIED_SUCCESS
                : MESSAGE.EMAIL_VERIFIED_FAILURE}
            </Typography>
            <Button onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}>
              {CLICK_TEXT.BACK_TO_LOGIN}
            </Button>
          </>
        )}
      </Container>
    </Container>
  );
};

export default EmailVerfication;
