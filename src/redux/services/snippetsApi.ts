import {
  API_ENDPOINTS,
  HTTP_METHODS,
  PRIVATE_ROUTES,
  SNIPPETS_API_ENDPOINTS,
} from "../../configs/enums";
import { baseApi } from "./baseApi";

// function to find which tag type we have to invalidate
const getType = () => {
  const location = window.location.pathname;
  return location === PRIVATE_ROUTES.FAVORITES ? "favorite" : "snippet";
};

export const snippetsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSnippets: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.SNIPPETS,
        method: HTTP_METHODS.GET,
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.snippets?.length
          ? result?.data?.snippets?.map(({ _id }: { _id: any }) => ({
              type: "snippet",
              _id,
            }))
          : ["snippet"],
    }),
    getFavoritesSnippets: builder.query({
      query: (params) => ({
        url: `${API_ENDPOINTS.SNIPPETS}${SNIPPETS_API_ENDPOINTS.FAVORITES}`,
        method: HTTP_METHODS.GET,
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.snippets?.length
          ? result?.data?.snippets?.map(({ _id }: { _id: any }) => ({
              type: "favorite",
              _id,
            }))
          : ["favorite"],
    }),
    getTrashSnippets: builder.query({
      query: (params) => ({
        url: `${API_ENDPOINTS.SNIPPETS}${SNIPPETS_API_ENDPOINTS.TRASH}`,
        method: HTTP_METHODS.GET,
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.snippets?.length
          ? result?.data?.snippets?.map(({ _id }: { _id: any }) => ({
              type: "trash",
              _id,
            }))
          : ["trash"],
    }),
    createSnippet: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.SNIPPETS,
        method: HTTP_METHODS.POST,
        body: body,
      }),
      invalidatesTags: ["snippet", "language"],
    }),
    updateSnippet: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${API_ENDPOINTS.SNIPPETS}/${id}`,
        method: HTTP_METHODS.PATCH,
        body: body,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: getType(), _id: _id },
      ],
    }),
    deleteSnippet: builder.mutation({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SNIPPETS}/${id}`,
        method: HTTP_METHODS.DELETE,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "trash", _id: _id },
      ],
    }),
    getSnippetById: builder.query({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SNIPPETS}/${id}`,
        method: HTTP_METHODS.GET,
      }),
    }),
    markFavorite: builder.mutation({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SNIPPETS}/${id}${SNIPPETS_API_ENDPOINTS.MARK_FAVORITE}`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "snippet", _id: _id },
      ],
    }),
    markUnfavorite: builder.mutation({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SNIPPETS}/${id}${SNIPPETS_API_ENDPOINTS.UNMARK_FAVORITE}`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: getType(), _id: _id },
      ],
    }),
    moveToTrash: builder.mutation({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SNIPPETS}/${id}${SNIPPETS_API_ENDPOINTS.TRASH}`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: getType(), _id: _id },
        { type: "language", _id: _id },
      ],
    }),
    restoreFromTrash: builder.mutation({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.SNIPPETS}/${id}${SNIPPETS_API_ENDPOINTS.RESTORE}`,
        method: HTTP_METHODS.PATCH,
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: "trash", _id: _id },
        { type: "language", _id: _id },
      ],
    }),
    getUserLanguages: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS.SNIPPETS}${SNIPPETS_API_ENDPOINTS.LANGUAGES}`,
        method: HTTP_METHODS.GET,
      }),
      providesTags: (result) =>
        result?.data?.snippets?.length
          ? result?.data?.snippets?.map(({ _id }: { _id: any }) => ({
              type: "language",
              _id,
            }))
          : ["language"],
    }),
    getSnippetCount: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS.SNIPPETS}${SNIPPETS_API_ENDPOINTS.COUNT}`,
        method: HTTP_METHODS.GET,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllSnippetsQuery,
  useGetFavoritesSnippetsQuery,
  useGetTrashSnippetsQuery,
  useGetSnippetByIdQuery,
  useCreateSnippetMutation,
  useUpdateSnippetMutation,
  useDeleteSnippetMutation,
  useMarkFavoriteMutation,
  useMarkUnfavoriteMutation,
  useMoveToTrashMutation,
  useRestoreFromTrashMutation,
  useGetUserLanguagesQuery,
  useGetSnippetCountQuery,
} = snippetsApi;
