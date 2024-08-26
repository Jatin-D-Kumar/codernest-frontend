import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Logout, Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import logo from "./../../assets/images/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FilledTab } from "../../styledComponents/FilledTab";
import { useLogoutMutation } from "../../redux/services/authApi";
import { isLoggedIn, logout } from "../../redux/features/userSlice";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "../../configs/enums";
import { APP_NAME, LABEL, CLICK_TEXT } from "../../configs/constants";
import { setNavbar } from "../../redux/features/navbarSlice";

const Appbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const loggedIn = useSelector(isLoggedIn);
  const user = useSelector((state: RootState) => state.user.userData);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md")); // Adjust the breakpoint as needed
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const isLoginScreen = location.pathname === PUBLIC_ROUTES.LOGIN;
  const isAuthScreen = [PUBLIC_ROUTES.LOGIN, PUBLIC_ROUTES.REGISTER].includes(
    location.pathname as any
  );

  const [logoutUser] = useLogoutMutation();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    dispatch(setNavbar());
  };

  const handleAccountClick = () => {
    navigate(PRIVATE_ROUTES.ACCOUNT);
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logoutUser(null);
    dispatch(logout());
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: theme.palette.background.default,
        borderBottom: "1px solid",
        borderColor: theme.palette.primary.main,
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {loggedIn && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            )}
            {(isLargeScreen || !loggedIn) && (
              <img src={logo} height={40} width={40} alt="codernest logo" />
            )}
            <Typography
              variant="h1"
              noWrap
              component={Link}
              to={PUBLIC_ROUTES.HOME}
              sx={{
                ml: 1,
                fontWeight: 700,
                fontSize: "1.25rem",
                letterSpacing: ".1rem",
                color: theme.palette.text.primary,
                textDecoration: "none",
                "&:hover": {
                  color: theme.palette.text.secondary,
                },
              }}
            >
              {APP_NAME}
            </Typography>
          </Box>
          {!loggedIn ? (
            isAuthScreen && (
              <Box display={{ xs: "none", sm: "flex" }}>
                <Tabs
                  value={isLoginScreen ? 0 : 1}
                  aria-label="login and register tabs"
                  TabIndicatorProps={{
                    style: {
                      display: "none",
                    },
                  }}
                >
                  <FilledTab
                    label={LABEL.LOGIN}
                    value={0}
                    onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
                  />
                  <FilledTab
                    label={LABEL.REGISTER}
                    value={1}
                    onClick={() => navigate(PUBLIC_ROUTES.REGISTER)}
                  />
                </Tabs>
              </Box>
            )
          ) : (
            <Box>
              <IconButton
                id="profile-logout-button"
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
              >
                <Avatar
                  src={user?.avatar}
                  alt={user?.username}
                  sx={{
                    color: theme.palette.text.primary,
                    bgcolor:
                      theme.palette[`${anchorElUser ? "secondary" : "primary"}`]
                        .main,
                    "&:hover": { bgcolor: theme.palette.secondary.main },
                  }}
                />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorElUser}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                slotProps={{
                  paper: {
                    elevation: 0,
                  },
                }}
              >
                <MenuItem onClick={handleAccountClick}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">
                    {CLICK_TEXT.ACCOUNT}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <Typography textAlign="center">
                    {CLICK_TEXT.LOGOUT}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
