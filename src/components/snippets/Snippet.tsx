import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Stack,
  Chip,
  useTheme,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import moment from "moment";
import CodeEditor from "../../styledComponents/CodeEditor";
import { useEffect, useRef, useState } from "react";
import DeleteSnippet from "./DeleteSnippet";
import MarkFavoriteSnippet from "./MarkFavoriteSnippet";
import RestoreSnippet from "./RestoreSnippet";
import { useDispatch } from "react-redux";
import {
  setEditSnippet,
  setSnippetForm,
} from "../../redux/features/snippetSlice";

const Snippet = ({ snippet }: any) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const editorRef = useRef<any>(null);
  const [editorHeight, setEditorHeight] = useState(210);

  const {
    _id,
    title,
    description,
    code,
    language: { title: languageTitle, value: languageValue },
    tags,
    isFavorite,
    createdAt,
    isDeleted,
  } = snippet;

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const lines = editor.getSession().getLength();
      setEditorHeight(Math.min(210, lines * 14 + 14));
    }
  }, []);

  const handleEditSnippetClick = () => {
    dispatch(setEditSnippet({ isEdit: true, id: _id }));
    dispatch(setSnippetForm(true));
  };

  return (
    <Card
      sx={{
        border: `1px solid ${theme.palette.primary.main}`,
        background: theme.palette.background.paper,
      }}
    >
      <CardHeader
        action={
          !isDeleted && <MarkFavoriteSnippet isFavorite={isFavorite} id={_id} />
        }
        title={title}
        subheader={moment(createdAt).fromNow()}
        sx={{
          ".MuiCardHeader-title": { fontSize: "1.2rem" },
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          ".ace_mobile-menu": {
            display: "none",
          },
        }}
      >
        <Stack direction={"row"} spacing={1}>
          {tags.map((tag: any, index: number) => (
            <Chip key={index} label={tag.name} color="primary" size="small" />
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <CodeEditor
          ref={editorRef}
          mode={languageValue}
          readOnly={true}
          showGutter={false}
          editorHeight={editorHeight}
          code={code}
          highlightActiveLine={false}
        />
      </CardContent>
      <CardActions disableSpacing sx={{ display: "flex" }}>
        <Typography variant="body2" fontWeight={400} flexGrow={1}>
          {languageTitle}
        </Typography>
        {isDeleted && <RestoreSnippet id={_id} />}
        <DeleteSnippet isDeleted={isDeleted} id={_id} />
        {!isDeleted && (
          <IconButton aria-label="Edit" onClick={handleEditSnippetClick}>
            <EditIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default Snippet;
