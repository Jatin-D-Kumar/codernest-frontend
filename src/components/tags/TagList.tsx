import { useEffect } from "react";

import { Add } from "@mui/icons-material";
import { Button, Chip, Divider, Grid, Tabs } from "@mui/material";

import { CLICK_TEXT, TOAST_MSG } from "../../configs/constants";

import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setErrorToast } from "../../redux/features/toastSlice";
import { useGetAllTagsQuery } from "../../redux/services/tagsApi";
import {
  setTagForm,
  setTagList,
  setTagValue,
} from "../../redux/features/tagSlice";
import { ApiErrorResponse, ApiResponse, Tag } from "../../configs/types";

const TagList = () => {
  const dispatch = useDispatch();
  const { tagValue, tagList } = useSelector((state: RootState) => state.tag);

  const getTagsQuery = useGetAllTagsQuery(null);

  useEffect(() => {
    if (getTagsQuery.isSuccess) {
      const { data } = getTagsQuery.data as ApiResponse;
      const formattedTagList: Tag[] = data?.tags?.map((tag: any) => {
        return {
          id: tag._id,
          name: tag.name,
        };
      });
      dispatch(setTagList(formattedTagList));
    }

    if (getTagsQuery.isError) {
      const error =
        (getTagsQuery.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    getTagsQuery.isSuccess,
    getTagsQuery.isError,
    getTagsQuery.data,
    dispatch,
    getTagsQuery.error,
  ]);

  const handleTagClick = (selectedTab: string) => {
    dispatch(setTagValue(selectedTab));
  };

  const handleAddTagClick = () => {
    dispatch(setTagForm(true));
  };
  return (
    <Grid
      item
      container
      xs={12}
      mb={1}
      justifyContent={"start"}
      alignItems={"center"}
      gap={1}
    >
      <Tabs
        variant="scrollable"
        sx={{
          maxWidth: { xs: "67vw", sm: "85vw", md: "65vw", xl: "75vw" },
          display: "flex",
          alignItems: "center",
        }}
        scrollButtons={false}
        aria-label="scrollable auto tabs example"
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        <Chip
          sx={{ mx: 0.5 }}
          label={"All"}
          onClick={() => handleTagClick("")}
          color={tagValue === "" ? "primary" : "default"}
          clickable
        />
        {tagList.map((tag: Tag) => (
          <Chip
            key={tag.id}
            sx={{ mx: 0.5 }}
            label={tag.name}
            onClick={() => handleTagClick(tag.id)}
            color={tagValue === tag.id ? "primary" : "default"}
            clickable
          />
        ))}
      </Tabs>
      <Divider orientation="vertical" flexItem />
      <Button
        id="create-tag-button"
        size="small"
        variant="contained"
        startIcon={<Add />}
        sx={{ height: "fit-content" }}
        onClick={handleAddTagClick}
      >
        {CLICK_TEXT.TAG}
      </Button>
    </Grid>
  );
};

export default TagList;
