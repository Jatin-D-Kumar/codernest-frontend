import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={24} /> : null}
    >
      {children}
    </Button>
  );
};

export default React.memo(LoadingButton);
