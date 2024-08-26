import {
  API_ENDPOINTS,
  HTTP_METHODS,
  USERS_API_ENDPOINTS,
} from "../../configs/enums";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.CURRENT_USER}`,
        method: HTTP_METHODS.GET,
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.REGISTER}`,
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.LOGIN}`,
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.LOGOUT}`,
        method: HTTP_METHODS.POST,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.FORGOT_PASSWORD}`,
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...body }) => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.RESET_PASSWORD}/${token}`,
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.CHANGE_PASSWORD}`,
        method: HTTP_METHODS.POST,
        body: body,
      }),
    }),
    verifyEmail: builder.query({
      query: ({ token }) => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.VERFIY_EMAIL}/${token}`,
        method: HTTP_METHODS.GET,
      }),
    }),
    resendEmailVerification: builder.mutation({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.RESEND_EMAIL_VERIFICATION}`,
        method: HTTP_METHODS.POST,
      }),
    }),
    avatar: builder.mutation({
      query: (body) => ({
        url: `${API_ENDPOINTS.USERS}${USERS_API_ENDPOINTS.AVATAR}`,
        method: HTTP_METHODS.PATCH,
        body: body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyCurrentUserQuery,
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useVerifyEmailQuery,
  useResendEmailVerificationMutation,
  useAvatarMutation,
} = authApi;
