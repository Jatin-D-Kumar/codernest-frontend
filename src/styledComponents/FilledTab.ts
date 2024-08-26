import { styled, Tab } from "@mui/material";

export const FilledTab = styled(Tab)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.primary,
  minHeight: 40,
  "&.Mui-selected": {
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.text.primary}`,
  },
  "&:hover": {
    backgroundColor: theme.palette.secondary.main,
  },
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
}));
