import {
  Box,
  Container,
  FormHelperText,
  Typography,
  useTheme,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { signUpSchema } from "../../schemas/signUp";
import FormikTextField from "../../styledComponents/FormikTextField";
import Dropzone from "../../styledComponents/Dropzone";
import { useEffect, useState } from "react";
import LoadingButton from "../../styledComponents/LoadingButton";
import { Link, useNavigate } from "react-router-dom";
import {
  CLICK_TEXT,
  FIELD_NAME,
  LABEL,
  MESSAGE,
  TEXT,
  TOAST_MSG,
} from "../../configs/constants";
import { useRegisterMutation } from "../../redux/services/authApi";
import { useDispatch } from "react-redux";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import { PUBLIC_ROUTES } from "../../configs/enums";
import { convertToFormData } from "../../helpers/utils";
import { ApiErrorResponse } from "../../configs/types";

const Register = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [registerUser, registerUserResponse] = useRegisterMutation();

  const handleSubmit = async (
    values: {
      avatar: string;
      username: string;
      email: string;
      password: string;
    },
    formikHelpers: FormikHelpers<{
      avatar: string;
      username: string;
      email: string;
      password: string;
    }>
  ): Promise<void | Promise<any>> => {
    const formData = convertToFormData(values);
    await registerUser(formData);
    formikHelpers.resetForm();
    setSelectedImage(null);
  };

  const formik = useFormik({
    initialValues: {
      avatar: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signUpSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const handleDrop = (files: FileList) => {
    const file = files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      formik.setFieldValue(FIELD_NAME.AVATAR, file);
    }
  };

  useEffect(() => {
    if (registerUserResponse.isSuccess) {
      dispatch(setSuccessToast(TOAST_MSG.REGISTER_SUCCESS));
      navigate(PUBLIC_ROUTES.LOGIN);
    }
    if (registerUserResponse.isError) {
      const error =
        (registerUserResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    navigate,
    registerUserResponse,
    registerUserResponse.isError,
    registerUserResponse.isSuccess,
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
          {TEXT.REGISTER}
        </Typography>
        <Typography
          color="primary"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: 1.2,
          }}
        >
          {TEXT.WELCOME}
        </Typography>
        <Typography sx={{ fontSize: "1rem", lineHeight: 1.5, mb: 2 }}>
          {MESSAGE.CREATE_ACCOUNT_TO_START}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Dropzone onDrop={handleDrop} selectedImage={selectedImage} />
            {formik.touched.avatar && (
              <FormHelperText>{formik.errors.avatar}</FormHelperText>
            )}
          </Box>
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
            type="email"
            id={FIELD_NAME.EMAIL}
            name={FIELD_NAME.EMAIL}
            label={LABEL.EMAIL}
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
            sx={{ mb: 2 }}
            formik={formik}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            size="small"
            loading={registerUserResponse.isLoading}
            sx={{ mb: 1 }}
          >
            {CLICK_TEXT.REGISTER}
          </LoadingButton>
        </form>
        <Typography
          color="primary"
          sx={{ fontSize: "1rem", lineHeight: 1, textAlign: "center" }}
        >
          {MESSAGE.ALREADY_HAVE_ACCOUNT}{" "}
          <Link to={PUBLIC_ROUTES.LOGIN} style={{ textDecoration: "none" }}>
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
              {CLICK_TEXT.LOGIN}
            </Typography>
          </Link>
        </Typography>
      </Container>
    </Container>
  );
};

export default Register;
