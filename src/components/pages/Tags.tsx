import { Button, Container, Grid, Typography, useTheme } from "@mui/material";
import SearchBar from "../../styledComponents/SearchBar";
import { useEffect, useState } from "react";
import useDebounce from "../../customHooks/useDebounce";
import { useDispatch } from "react-redux";
import { setTagForm } from "../../redux/features/tagSlice";
import { ApiErrorResponse, ApiResponse, Tag } from "../../configs/types";
import NoData from "../common/NoData";
import { useGetAllTagsQuery } from "../../redux/services/tagsApi";
import {
  CLICK_TEXT,
  MESSAGE,
  PLACEHOLDER,
  TOAST_MSG,
} from "../../configs/constants";
import { setErrorToast } from "../../redux/features/toastSlice";
import { Add as AddIcon } from "@mui/icons-material";
import TagCard from "../tags/TagCard";

const Tags = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tagList, setTagList] = useState<Tag[]>([]);

  const [searchVal, setSearchVal] = useState<string>("");
  const [query, setQuery] = useState<string>(searchVal);
  const deferredQuery = useDebounce(query, 1000);

  useEffect(() => {
    setSearchVal(deferredQuery);
  }, [deferredQuery]);

  const handleSnippetQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    setQuery(query);
  };

  const getTagsQuery = useGetAllTagsQuery(null);

  useEffect(() => {
    if (getTagsQuery.isSuccess) {
      const { data } = getTagsQuery.data as ApiResponse;
      const formattedTagList: Tag[] = data.tags?.map((tag: any) => {
        return {
          id: tag._id,
          name: tag.name,
        };
      });
      setTagList(formattedTagList);
    }

    if (getTagsQuery.isError) {
      const error =
        (getTagsQuery.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    getTagsQuery.isSuccess,
    getTagsQuery.isError,
    getTagsQuery.data,
    getTagsQuery.error,
  ]);

  const handleAddTagClick = () => {
    dispatch(setTagForm(true));
  };

  const updatedTagList = tagList.filter((tag: Tag) =>
    tag.name.includes(searchVal)
  );

  return (
    <Container
      sx={{
        minWidth: "100%",
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h3">Tags</Typography>
      <Grid container mt={1}>
        <Grid item xs={10} container gap={1}>
          <Grid item xs={9.5}>
            <SearchBar
              placeholder={PLACEHOLDER.SEARCH_TAG}
              value={query}
              handleChange={handleSnippetQueryChange}
            />
          </Grid>
          <Grid item xs={1.5}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddTagClick}
            >
              {CLICK_TEXT.TAG}
            </Button>
          </Grid>
        </Grid>
        <Grid xs={12} maxHeight={"70vh"} sx={{ overflowY: "scroll" }} mt={1}>
          {updatedTagList.length === 0 ? (
            <NoData text={MESSAGE.NO_TAGS} />
          ) : (
            updatedTagList.map((tag: Tag, index) => (
              <TagCard tag={tag} index={index} />
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tags;
