import { Source } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

const NoData = ({ text }: { text: string }) => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignContent={"center"}
      height={"100%"}
    >
      <Box textAlign={"center"}>
        <Source sx={{ fontSize: "5rem", color: "gray" }} />
        <Typography
          variant="body1"
          color={"primary"}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Box>
    </Grid>
  );
};

export default NoData;
