import { Add } from "@mui/icons-material";
import { Grid, Button } from "@mui/material";
import SearchBar from "../../styledComponents/SearchBar";
import { CLICK_TEXT, PLACEHOLDER } from "../../configs/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setSnippetForm,
  setSnippetQuery,
} from "../../redux/features/snippetSlice";
import TagList from "../tags/TagList";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import useDebounce from "../../customHooks/useDebounce";

const Headerbar = () => {
  const dispatch = useDispatch();
  const { snippetQuery } = useSelector((state: RootState) => state.snippet);

  const [query, setQuery] = useState<string>(snippetQuery);
  const deferredQuery = useDebounce(query, 1000);

  useEffect(() => {
    dispatch(setSnippetQuery(deferredQuery));
  }, [deferredQuery, dispatch]);

  const handleSnippetQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setQuery(query);
  };

  const handleAddSnippetClick = () => {
    dispatch(setSnippetForm(true));
  };

  return (
    <Grid
      position={"fixed"}
      sx={{
        width: "100%",
        px: 1,
        pt: 1,
        zIndex: (theme) => theme.zIndex.drawer - 1,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Grid
        item
        container
        xs={12}
        md={10}
        my={1}
        justifyContent={{ xs: "center", sm: "start" }}
        gap={1}
      >
        <Grid item xs={12} sm={8}>
          <SearchBar
            placeholder={PLACEHOLDER.SEARCH_BAR}
            value={query}
            handleChange={handleSnippetQueryChange}
          />
        </Grid>
        <Grid item sm={2} display={{ xs: "none", sm: "flex" }}>
          <Button
            id="create-snippet-button"
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddSnippetClick}
          >
            {CLICK_TEXT.SNIPPET}
          </Button>
        </Grid>
      </Grid>
      <TagList />
    </Grid>
  );
};

export default Headerbar;
