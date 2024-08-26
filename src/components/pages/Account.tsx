import { Button, Divider, Grid, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { PRIVATE_ROUTES } from "../../configs/enums";
import LanguageList from "../account/LanguageList";
import UpdateAvatar from "../account/UpdateAvatar";
import SnippetCount from "../account/SnippetCount";
import { CLICK_TEXT } from "../../configs/constants";

const Account = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { userData } = useSelector((state: RootState) => state.user);

  return (
    <Grid container color={theme.palette.text.primary}>
      <Grid item container xs={12}>
        <Grid item xs={12} sm={6}>
          <UpdateAvatar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-evenly"}
          gap={1}
        >
          <Typography variant="h3">{userData.username}</Typography>
          <Typography variant="body1">{userData.email}</Typography>
          {userData.loginType === "EMAIL_PASSWORD" && (
            <Button
              variant={"contained"}
              startIcon={<Lock />}
              onClick={() => navigate(PRIVATE_ROUTES.CHANGE_PASSWORD)}
            >
              {CLICK_TEXT.CHANGE_PASSWORD}
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider sx={{ width: "100%", my: 2 }} />
      <SnippetCount />
      <LanguageList />
    </Grid>
  );
};

export default Account;
