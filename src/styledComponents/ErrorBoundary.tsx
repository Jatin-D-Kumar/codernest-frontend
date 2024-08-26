import { Component, ErrorInfo, ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";
import { MESSAGE } from "../configs/constants";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Box minHeight={"100dvh"} sx={{ backgroundColor: "#0f172a" }}>
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
                bgcolor: "#f1f5f9",
                p: 2,
                borderRadius: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" fontSize={"2rem"}>
                {MESSAGE.SOMETHING_WENT_WRONG}
              </Typography>
            </Container>
          </Container>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
