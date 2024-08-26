import { API_ENDPOINTS, HTTP_METHODS } from "../../configs/enums";
import { baseApi } from "./baseApi";

export const languagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLanguages: builder.query({
      query: () => ({
        url: API_ENDPOINTS.LANGUAGES,
        method: HTTP_METHODS.GET,
      }),
    }),
  }),
});

export const { useGetAllLanguagesQuery } = languagesApi;
