import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#8e24aa",
    },
    secondary: {
      main: "#ab47bc",
    },
    background: {
      default: "#0f172a",
      paper: "#121212",
    },
    text: {
      primary: "#f1f5f9",
      secondary: "#cbd5e1",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            color: "#ab47bc !important", // Text color
          },
          "& .MuiInputLabel-root": {
            color: "#ab47bc !important", // Label color
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#8e24aa",
          },
          "& .MuiInputBase-input.MuiOutlinedInput-input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px transparent inset",
            WebkitTextFillColor: "#ab47bc", // Text color
            borderColor: "#ab47bc", // Border color
            transition: "background-color 5000s ease-in-out 0s",
          },
          "& fieldset": {
            borderColor: "#8e24aa !important", // Initial border color
          },
          "&:hover fieldset": {
            borderColor: "#ab47bc !important", // Border color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#ab47bc !important", // Border color when focused
          },
          "&.Mui-error fieldset": {
            borderColor: "#8e24aa !important", // Border color in error state
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#ab47bc !important", // Error message color
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#8e24aa", // Normal background color
          color: "#fff", // Normal text color
          "&:hover": {
            backgroundColor: "#ab47bc", // Background color on hover
          },
          "&:disabled": {
            backgroundColor: "#c0c0c0", // Disabled background color
            color: "#6b6b6b", // Disabled text color
          },
        },
        outlined: {
          backgroundColor: "transparent", // Transparent background for outlined
          borderColor: "#8e24aa", // Border color for outlined variant
          color: "#8e24aa", // Text color for outlined variant
          "&:hover": {
            backgroundColor: "#8e24aa", // Slight background color on hover
            color: "#fff",
          },
          "&:disabled": {
            borderColor: "#c0c0c0", // Disabled border color
            color: "#6b6b6b", // Disabled text color
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#8e24aa !important",
          color: "#ab47bc !important",
          "::before": {
            borderColor: "#8e24aa !important",
          },
          "::after": {
            borderColor: "#8e24aa !important",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
              color: "#ab47bc",
            },
          },
          "&.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.16)",
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
              color: "#ab47bc",
            },
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  },
});
