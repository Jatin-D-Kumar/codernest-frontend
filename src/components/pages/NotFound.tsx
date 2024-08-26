import { Button, Container, Typography, useTheme } from "@mui/material";
import { CLICK_TEXT, MESSAGE, TEXT } from "../../configs/constants";
import { PUBLIC_ROUTES } from "../../configs/enums";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
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
        <Typography variant="h1">{TEXT.NOT_FOUND_STATUS}</Typography>
        <Typography variant="body2">{MESSAGE.NOT_FOUND_MESSAGE_ONE}</Typography>
        <Typography variant="body2">{MESSAGE.NOT_FOUND_MESSAGE_TWO}</Typography>
        <Button
          variant="outlined"
          onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}
          sx={{ mt: 2 }}
        >
          {CLICK_TEXT.BACK_TO_LOGIN}
        </Button>
      </Container>
    </Container>
  );
};

export default NotFound;
