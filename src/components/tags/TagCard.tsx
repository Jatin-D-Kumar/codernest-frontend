import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Tag as TagIcon, Edit as EditIcon } from "@mui/icons-material";
import { Tag } from "../../configs/types";
import TagDelete from "./TagDelete";
import { useDispatch } from "react-redux";
import { setEditTag, setTagForm } from "../../redux/features/tagSlice";

const TagCard = ({ tag, index }: { tag: Tag; index: number }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleEditTag = () => {
    dispatch(setEditTag({ isEdit: true, tag: tag }));
    dispatch(setTagForm(true));
  };
  return (
    <Grid
      item
      xs={12}
      key={tag.id}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: theme.palette.background.paper,
        borderTop:
          index === 0 ? `1px solid ${theme.palette.primary.main}` : "none",
        borderBottom: `1px solid ${theme.palette.primary.main}`,
        padding: 2,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          maxWidth: "60%",
        }}
      >
        <TagIcon />
        {tag.name}
      </Typography>
      <Box>
        <IconButton aria-label="update" onClick={handleEditTag}>
          <EditIcon />
        </IconButton>
        <TagDelete id={tag.id} />
      </Box>
    </Grid>
  );
};

export default TagCard;
