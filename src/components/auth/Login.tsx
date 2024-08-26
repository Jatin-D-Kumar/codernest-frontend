import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import FormikTextField from "../../styledComponents/FormikTextField";
import LoadingButton from "../../styledComponents/LoadingButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInSchema } from "../../schemas/signIn";
import {
  Google as GoogleIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";
import {
  CLICK_TEXT,
  FIELD_NAME,
  LABEL,
  MESSAGE,
  TEXT,
  TOAST_MSG,
} from "../../configs/constants";
import {
  API_ENDPOINTS,
  PUBLIC_ROUTES,
  USERS_API_ENDPOINTS,
} from "../../configs/enums";
import { useLoginMutation } from "../../redux/services/authApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import { setUserDataAndTokens } from "../../redux/features/userSlice";
import { ApiErrorResponse } from "../../configs/types";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginUser, loginUserResponse] = useLoginMutation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    const errorMessage = params.get("error_description");

    if (error && errorMessage) {
      dispatch(setErrorToast(`${error}: ${errorMessage}`));
      navigate(PUBLIC_ROUTES.LOGIN, { replace: true });
    }
  }, [dispatch, location.search, navigate]);

  const handleSubmit = async (
    values: {
      username: string;
      password: string;
    },
    formikHelpers: FormikHelpers<{
      username: string;
      password: string;
    }>
  ): Promise<void | Promise<any>> => {
    const response = await loginUser(values).unwrap();
    const { user, accessToken, refreshToken } = response?.data;
    dispatch(
      setUserDataAndTokens({
        userData: user,
        accessToken,
        refreshToken,
        loggedIn: user?.isEmailVerified,
      })
    );
    if (!user?.isEmailVerified) {
      navigate(PUBLIC_ROUTES.RESEND_EMAIL);
    }
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signInSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  function handleGoogleSignIn() {
    const googleSignInUrl = `${API_ENDPOINTS.BASE_API}${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.GOOGLE}`;
    window.location.href = googleSignInUrl;
  }

  function handleGitHubSignIn() {
    const githubSignInUrl = `${API_ENDPOINTS.BASE_API}${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.GITHUB}`;
    window.location.href = githubSignInUrl;
  }

  useEffect(() => {
    if (loginUserResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.LOGIN_SUCCESS));
    }
    if (loginUserResponse.isError) {
      const error =
        (loginUserResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    loginUserResponse,
    loginUserResponse.isError,
    loginUserResponse.isSuccess,
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
          {TEXT.LOGIN}
        </Typography>
        <Typography
          color="primary"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          {TEXT.WELCOME_BACK}
        </Typography>
        <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, mb: 2 }}>
          {MESSAGE.LOGIN_TO_MANAGE}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormikTextField
            type="text"
            id={FIELD_NAME.USERNAME}
            name={FIELD_NAME.USERNAME}
            label={LABEL.USERNAME}
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 2 }}
            formik={formik}
          />
          <FormikTextField
            type="password"
            id={FIELD_NAME.PASSWORD}
            name={FIELD_NAME.PASSWORD}
            label={LABEL.PASSWORD}
            variant="outlined"
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            formik={formik}
          />
          <Typography
            component={Link}
            to={PUBLIC_ROUTES.FORGOT_PASSWORD}
            sx={{
              color: theme.palette.primary.main,
              textDecoration: "none",
              "&:hover": {
                color: theme.palette.secondary.main,
                borderBottom: `1px solid ${theme.palette.primary.main}`,
              },
            }}
          >
            {CLICK_TEXT.FORGOT_PASSWORD}
          </Typography>
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            size="small"
            loading={loginUserResponse.isLoading}
            sx={{ my: 1 }}
          >
            {CLICK_TEXT.LOGIN}
          </LoadingButton>
        </form>
        <Typography
          color="primary"
          sx={{ fontSize: "1rem", lineHeight: 1, textAlign: "center", mb: 1 }}
        >
          {MESSAGE.DONT_HAVE_ACCOUNT}{" "}
          <Link to={PUBLIC_ROUTES.REGISTER} style={{ textDecoration: "none" }}>
            <Typography
              component="span"
              color="primary"
              sx={{
                borderBottom: "1px solid transparent",
                "&:hover": {
                  borderBottomColor: "primary.main",
                  color: "secondary.main",
                },
              }}
            >
              {CLICK_TEXT.REGISTER_HERE}
            </Typography>
          </Link>
        </Typography>
        <Divider>{TEXT.OR}</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
            sx={{
              backgroundColor: "#4285F4",
              "&:hover": {
                backgroundColor: "#357ae8",
              },
            }}
          >
            <Typography variant="button" sx={{ color: "white" }}>
              {CLICK_TEXT.SIGN_GOOGLE}
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<GitHubIcon />}
            onClick={handleGitHubSignIn}
            sx={{
              backgroundColor: "#333",
              "&:hover": {
                backgroundColor: "#24292e",
              },
            }}
          >
            <Typography variant="button" sx={{ color: "white" }}>
              {CLICK_TEXT.SIGN_GITHUB}
            </Typography>
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default Login;
