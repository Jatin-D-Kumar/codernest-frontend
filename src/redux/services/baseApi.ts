import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { RootState } from "../store";
import { logout, setTokens } from "../features/userSlice";
import {
  API_ENDPOINTS,
  HTTP_METHODS,
  USERS_API_ENDPOINTS,
} from "../../configs/enums";

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  statusCode: number;
  success: boolean;
}

const baseQuery = fetchBaseQuery({
  baseUrl: API_ENDPOINTS.BASE_API,
  //   credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// create a new mutex
const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    result.error.status === 401 &&
    (result.error.data as any)?.message === "jwt expired"
  ) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Try to refresh the token
        const refreshResult = await baseQuery(
          {
            url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.REFRESH_TOKEN}`,
            method: HTTP_METHODS.POST,
            body: {
              refreshToken: (api.getState() as RootState).user.refreshToken,
            },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          const {
            data: { accessToken, refreshToken },
          } = refreshResult.data as RefreshTokenResponse;
          // Store the new token
          api.dispatch(setTokens({ accessToken, refreshToken }));

          // Retry the original query with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If token refresh fails, handle logout or other appropriate action
          api.dispatch(logout()); // Example action to handle logout
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["snippet", "favorite", "trash", "tag", "language"],
  endpoints: () => ({}),
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  refetchOnFocus: false,
  keepUnusedDataFor: 1,
});
