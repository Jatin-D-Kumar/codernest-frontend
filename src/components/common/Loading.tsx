import { Box, CircularProgress, Grid } from "@mui/material";

const Loading = () => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      height={"100%"}
    >
      <Box textAlign={"center"}>
        <CircularProgress size={50} />
      </Box>
    </Grid>
  );
};

export default Loading;
