import { API_ENDPOINTS, HTTP_METHODS } from "../../configs/enums";
import { baseApi } from "./baseApi";

export const tagsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: (params) => ({
        url: API_ENDPOINTS.TAGS,
        method: HTTP_METHODS.GET,
        params: params,
      }),
      providesTags: (result) =>
        result?.data?.tags?.length
          ? result.data.tags?.map(({ _id }: { _id: any }) => ({
              type: "tag",
              _id,
            }))
          : ["tag"],
    }),
    createTag: builder.mutation({
      query: (body) => ({
        url: API_ENDPOINTS.TAGS,
        method: HTTP_METHODS.POST,
        body: body,
      }),
      invalidatesTags: ["tag"],
    }),
    updateTag: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${API_ENDPOINTS.TAGS}/${id}`,
        method: HTTP_METHODS.PATCH,
        body: body,
      }),
      invalidatesTags: ["tag"],
    }),
    deleteTag: builder.mutation({
      query: ({ id }) => ({
        url: `${API_ENDPOINTS.TAGS}/${id}`,
        method: HTTP_METHODS.DELETE,
      }),
      invalidatesTags: ["tag"],
    }),
  }),
});

export const {
  useGetAllTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi;
