export enum PUBLIC_ROUTES {
  HOME = "/",
  LOGIN = "/login",
  REGISTER = "/register",
  VERIFY_EMAIL = "/verify-email/:token",
  FORGOT_PASSWORD = "/forgot-password",
  RESEND_EMAIL = "/resend-email",
  RESET_PASSWORD = "/reset-password/:token",
  WILDCARD = "*",
}

export enum PRIVATE_ROUTES {
  APP = "/app",
  FAVORITES = "/favorites",
  TRASH = "/trash",
  TAGS = "/tags",
  LANGUAGES = "/languages",
  LANGUAGE = "/:language",
  ACCOUNT = "/account",
  CHANGE_PASSWORD = "/change-password",
}

export enum API_ENDPOINTS {
  BASE_API = "https://codernest-backend.vercel.app",
  USERS = "/api/v1/users",
  SNIPPETS = "/api/v1/snippets",
  TAGS = "/api/v1/tags",
  LANGUAGES = "/api/v1/languages",
}

export enum USERS_API_ENDPOINTS {
  LOGIN = "/login",
  REGISTER = "/register",
  GOOGLE = "/google",
  GITHUB = "/github",
  LOGOUT = "/logout",
  AVATAR = "/avatar",
  CURRENT_USER = "/current-user",
  REFRESH_TOKEN = "/refresh-token",
  VERFIY_EMAIL = "/verify-email",
  RESET_PASSWORD = "/reset-password",
  FORGOT_PASSWORD = "/forgot-password",
  CHANGE_PASSWORD = "/change-password",
  RESEND_EMAIL_VERIFICATION = "/resend-email-verification",
}

export enum SNIPPETS_API_ENDPOINTS {
  FAVORITES = "/favorites",
  MARK_FAVORITE = "/favorite",
  UNMARK_FAVORITE = "/unfavorite",
  TRASH = "/trash",
  RESTORE = "/restore",
  LANGUAGES = "/languages",
  COUNT = "/count",
}

export enum LANGUAGES_API_ENDPOINTS {
  USER = "/user",
}

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}
