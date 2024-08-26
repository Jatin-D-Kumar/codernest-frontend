import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Snippet from "../snippets/Snippet";
import { ApiErrorResponse, ApiResponse } from "../../configs/types";
import { setErrorToast } from "../../redux/features/toastSlice";
import MasonryGrid from "../../styledComponents/masonry/MasonryGrid";
import { useGetAllSnippetsQuery } from "../../redux/services/snippetsApi";
import {
  masonryScreenWidthToColumns,
  MESSAGE,
  TOAST_MSG,
} from "../../configs/constants";
import Loading from "../common/Loading";
import NoData from "../common/NoData";
import { RootState } from "../../redux/store";

const Snippets = () => {
  const dispatch = useDispatch();
  const { tagValue } = useSelector((state: RootState) => state.tag);
  const { snippetQuery } = useSelector((state: RootState) => state.snippet);
  const [snippetList, setSnippetList] = useState<any[]>([]);

  const getSnippetsQuery = useGetAllSnippetsQuery({
    tag: tagValue ? tagValue : undefined,
    title: snippetQuery ? snippetQuery : undefined,
  });

  useEffect(() => {
    if (getSnippetsQuery.isSuccess) {
      const { data } = getSnippetsQuery.data as ApiResponse;
      setSnippetList((data as any)?.snippets);
    }

    if (getSnippetsQuery.isError) {
      const error =
        (getSnippetsQuery.error as ApiErrorResponse).data.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    getSnippetsQuery.isSuccess,
    getSnippetsQuery.isError,
    getSnippetsQuery.data,
    dispatch,
    getSnippetsQuery.error,
  ]);

  if (getSnippetsQuery.isLoading) {
    return <Loading />;
  }

  if (!snippetList.length) {
    return <NoData text={MESSAGE.NO_DATA} />;
  }

  return (
    <Grid container>
      <MasonryGrid screenWidthToColumns={masonryScreenWidthToColumns}>
        {snippetList.length &&
          snippetList.map((snippet) => (
            <Snippet key={snippet._id} snippet={snippet} />
          ))}
      </MasonryGrid>
    </Grid>
  );
};

export default Snippets;
