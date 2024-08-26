import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Code, Favorite, GridView, Recycling, Tag } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../configs/enums";
import {
  CLICK_TEXT,
  DRAWER_WIDTH,
  TEXT,
  TOAST_MSG,
} from "../../configs/constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setNavbar } from "../../redux/features/navbarSlice";
import { useGetUserLanguagesQuery } from "../../redux/services/snippetsApi";
import { useEffect, useState } from "react";
import { ApiErrorResponse, ApiResponse } from "../../configs/types";
import { setErrorToast } from "../../redux/features/toastSlice";

const NAV_ITEMS = [
  {
    id: "all-snippets-button",
    title: CLICK_TEXT.ALL_SNIPPETS,
    icon: <GridView />,
    url: PRIVATE_ROUTES.APP,
  },
  {
    id: "favorite-snippets-button",
    title: CLICK_TEXT.FAVORITES,
    icon: <Favorite />,
    url: PRIVATE_ROUTES.FAVORITES,
  },
  {
    id: "all-tags-button",
    title: CLICK_TEXT.TAGS,
    icon: <Tag />,
    url: PRIVATE_ROUTES.TAGS,
  },
  {
    id: "trash-snippets-button",
    title: CLICK_TEXT.TRASH,
    icon: <Recycling />,
    url: PRIVATE_ROUTES.TRASH,
  },
];

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open } = useSelector((state: RootState) => state.navbar);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleDrawerClose = () => {
    dispatch(setNavbar());
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: theme.palette.background.paper,
      }}
    >
      <Toolbar />
      <Divider />
      <ListSubheader
        component="div"
        id="subheader"
        sx={{
          color: theme.palette.primary.main,
          fontSize: "1rem",
          fontWeight: 600,
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        {TEXT.QUICK_LINKS}
      </ListSubheader>
      <List>
        {NAV_ITEMS.map((nav_item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              id={nav_item.id}
              selected={location.pathname === nav_item.url}
              onClick={() => {
                navigate(nav_item.url);
                handleDrawerClose();
              }}
            >
              <ListItemIcon>{nav_item.icon}</ListItemIcon>
              <ListItemText primary={nav_item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {userLanguages.length > 0 && (
        <ListSubheader
          component="div"
          id="subheader"
          sx={{
            color: theme.palette.primary.main,
            fontSize: "1rem",
            fontWeight: 600,
            borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {TEXT.LANGUAGES}
        </ListSubheader>
      )}
      {userLanguages.length > 0 && (
        <List
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
          }}
        >
          {userLanguages.map((language) => (
            <ListItem key={language._id} disablePadding>
              <ListItemButton
                selected={
                  location.pathname ===
                  `${PRIVATE_ROUTES.LANGUAGES}/${language.value}`
                }
                onClick={() => {
                  navigate(`${PRIVATE_ROUTES.LANGUAGES}/${language.value}`, {
                    state: { languageId: language._id },
                  });
                  handleDrawerClose();
                }}
              >
                <ListItemIcon>
                  <Code />
                </ListItemIcon>
                <ListItemText
                  primary={`${language.title} (${language.count})`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      aria-label="drawer"
    >
      <Drawer
        variant="temporary"
        open={open && isMobile}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: DRAWER_WIDTH,
            borderColor: theme.palette.primary.main,
          },
        }}
        open={true}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Navbar;
