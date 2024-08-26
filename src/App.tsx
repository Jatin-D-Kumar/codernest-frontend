import "./App.css";
import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Snippets from "./components/pages/Snippets";
import Login from "./components/auth/Login";
import Layout from "./components/layout/Layout";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import EmailVerfication from "./components/auth/EmailVerfication";
import { isLoggedIn, setTokens, setUserData } from "./redux/features/userSlice";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./configs/enums";
import ResetPassword from "./components/auth/ResetPassword";
import Toaster from "./components/common/Toaster";
import NotFound from "./components/pages/NotFound";
import ResendEmail from "./components/auth/ResendEmail";
import Account from "./components/pages/Account";
import { useLazyCurrentUserQuery } from "./redux/services/authApi";
import { setErrorToast } from "./redux/features/toastSlice";
import { TOAST_MSG } from "./configs/constants";
import MainLayout from "./components/layout/MainLayout";
import Favorites from "./components/pages/Favorites";
import Tags from "./components/pages/Tags";
import Trash from "./components/pages/Trash";
import Languages from "./components/pages/Languages";
import ChangePassword from "./components/auth/ChangePassword";
import { ApiErrorResponse } from "./configs/types";
import Tour from "./styledComponents/Tour";

function App() {
  const theme = useTheme();
  const loggedIn = useSelector(isLoggedIn);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fetchUser, fetchUserResponse] = useLazyCurrentUserQuery();

  useEffect(() => {
    if (fetchUserResponse.isSuccess) {
      const userData = fetchUserResponse.data?.data;
      dispatch(setUserData(userData));
    }
    if (fetchUserResponse.isError) {
      console.log(
        "Error ::",
        (fetchUserResponse.error as ApiErrorResponse)?.data?.message
      );
      dispatch(setErrorToast(TOAST_MSG.SOMETHING_WENT_WRONG));
    }
  }, [
    dispatch,
    fetchUserResponse.data?.data,
    fetchUserResponse.error,
    fetchUserResponse.isError,
    fetchUserResponse.isSuccess,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      dispatch(setTokens({ accessToken, refreshToken }));
      fetchUser(null);
      navigate(PRIVATE_ROUTES.APP, { replace: true });
    }
  }, [dispatch, fetchUser, location.search, navigate]);

  const publicRoutes = () => {
    return (
      <>
        <Route path={PUBLIC_ROUTES.LOGIN} element={<Login />} />
        <Route path={PUBLIC_ROUTES.REGISTER} element={<Register />} />
        <Route
          path={PUBLIC_ROUTES.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route
          path={PUBLIC_ROUTES.VERIFY_EMAIL}
          element={<EmailVerfication />}
        />
        <Route
          path={PUBLIC_ROUTES.RESET_PASSWORD}
          element={<ResetPassword />}
        />
        <Route path={PUBLIC_ROUTES.RESEND_EMAIL} element={<ResendEmail />} />
      </>
    );
  };

  const privateRoutes = () => {
    return (
      <Route element={<MainLayout />}>
        <Route path={PRIVATE_ROUTES.APP} element={<Snippets />} />
        <Route path={PRIVATE_ROUTES.FAVORITES} element={<Favorites />} />
        <Route path={PRIVATE_ROUTES.TAGS} element={<Tags />} />
        <Route path={PRIVATE_ROUTES.TRASH} element={<Trash />} />
        <Route
          path={`${PRIVATE_ROUTES.LANGUAGES}${PRIVATE_ROUTES.LANGUAGE}`}
          element={<Languages />}
        />
        <Route path={PRIVATE_ROUTES.ACCOUNT} element={<Account />} />
        <Route
          path={PRIVATE_ROUTES.CHANGE_PASSWORD}
          element={<ChangePassword />}
        />
      </Route>
    );
  };

  return (
    <Box
      minHeight={"100dvh"}
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Toaster />
      <Tour />
      <Routes>
        <Route element={<Layout />}>
          {loggedIn ? privateRoutes() : publicRoutes()}
          <Route
            path={PUBLIC_ROUTES.WILDCARD}
            element={
              <Navigate
                to={loggedIn ? PRIVATE_ROUTES.APP : PUBLIC_ROUTES.LOGIN}
              />
            }
          />
          <Route path={PUBLIC_ROUTES.WILDCARD} element={<NotFound />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
