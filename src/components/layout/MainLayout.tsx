import { Fragment } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../common/Navbar";
import { Box, Fab } from "@mui/material";
import { DRAWER_WIDTH } from "../../configs/constants";
import TagForm from "../tags/TagForm";
import SnippetForm from "../snippets/SnippetForm";
import Headerbar from "../common/Headerbar";
import { Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setSnippetForm } from "../../redux/features/snippetSlice";
import { PRIVATE_ROUTES } from "../../configs/enums";

const MainLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAddSnippetClick = () => {
    dispatch(setSnippetForm(true));
  };

  const isSnippetScreen = [
    PRIVATE_ROUTES.APP,
    PRIVATE_ROUTES.FAVORITES,
    PRIVATE_ROUTES.TRASH,
    PRIVATE_ROUTES.LANGUAGES,
  ].some((route) => location.pathname.includes(route));

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          }}
        >
          {/* <Toolbar /> */}
          {isSnippetScreen && (
            <Box pb={"115px"}>
              <Headerbar />
            </Box>
          )}
          <Box p={1}>
            <Outlet />
          </Box>
        </Box>
      </Box>
      {/** Tag Form */}
      <TagForm />
      {/** Snippet Form */}
      <SnippetForm />
      {/** Fab Icon */}
      {isSnippetScreen && (
        <Fab
          color="primary"
          aria-label="add"
          size="medium"
          onClick={handleAddSnippetClick}
          sx={{
            display: { xs: "flex", sm: "none" },
            position: "fixed",
            bottom: "16px",
            right: "16px",
          }}
        >
          <Add />
        </Fab>
      )}
    </Fragment>
  );
};

export default MainLayout;
