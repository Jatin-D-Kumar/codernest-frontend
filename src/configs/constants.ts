export const APP_NAME = "CoderNest";

export const DRAWER_WIDTH = 240;

export const TEXT = {
  CHANGE_PASSWORD: "Change Password",
  CREATE_SNIPPET: "New Snippet",
  EDIT_SNIPPET: "Edit Snippet",
  CREATE_TAG: "New Tag",
  EDIT_TAG: "Edit TAg",
  ERROR: "Error",
  FAVORITE_SNIPPETS: "Favorite Snippets",
  LANGUAGES: "Languages",
  LOGIN: "Login",
  NOT_FOUND_STATUS: "404",
  OR: "Or",
  QUICK_LINKS: "Quick Links",
  RECOVER_ACCOUNT: "Recover Account",
  REGISTER: "Register",
  RESET_PASSWORD: "Reset Password",
  TOTAL_SNIPPETS: "Total Snippets",
  UPDATE_PASSWORD: "Update Password",
  VERIFIED: "Verified!",
  WELCOME: "Welcome",
  WELCOME_BACK: "Welcome Back",
};

export const CLICK_TEXT = {
  ACCOUNT: "Account",
  ALL_SNIPPETS: "All Snippets",
  BACK: "Back",
  BACK_TO_LOGIN: "Back To Login",
  CANCEL: "Cancel",
  CHANGE_PASSWORD: "Change Password",
  CREATE: "Create",
  EDIT: "Edit",
  FAVORITES: "Favorites",
  FORGOT_PASSWORD: "Forgot password",
  LANGUAGES: "Languages",
  LOGIN: "Login",
  LOGOUT: "Logout",
  REGISTER: "Register",
  REGISTER_HERE: "Register here",
  RESEND_EMAIL: "Resend Email",
  RESET: "Reset",
  SEND_RESET_LINK: "Send Reset Link",
  SUBMIT: "Submit",
  SIGN_GOOGLE: "Sign in with Google",
  SIGN_GITHUB: "Sign in with GitHub",
  SNIPPET: "Snippet",
  TAG: "Tag",
  TAGS: "Tags",
  TRASH: "Trash",
  UPDATE_PASSWORD: "Update Password",
};

export const LABEL = {
  CODE: "Code",
  DESCRIPTION: "Description",
  EMAIL: "Email",
  ENTER_YOUR_EMAIL: "Enter your email",
  LANGUAGE: "Language",
  LOGIN: "Login",
  NEW_PASSWORD: "New Password",
  OLD_PASSWORD: "Old Password",
  PASSWORD: "Password",
  REGISTER: "Register",
  TAGS: "Tags",
  TAG_NAME: "Tag Name",
  TITLE: "Title",
  USERNAME: "Username",
};

export const FIELD_NAME = {
  AVATAR: "avatar",
  CODE: "code",
  DESCRIPTION: "description",
  EMAIL: "email",
  LANGUAGE: "language",
  NAME: "name",
  NEW_PASSWORD: "newPassword",
  OLD_PASSWORD: "oldPassword",
  PASSWORD: "password",
  TAGS: "tags",
  TITLE: "title",
  USERNAME: "username",
};

export const PLACEHOLDER = {
  SEARCH_BAR: "Search a snippet...",
  SEARCH_TAG: "Search a tag...",
};

export const MESSAGE = {
  ALREADY_HAVE_ACCOUNT: "Already have an account?",
  CHANGE_PASSWORD:
    "To update your password, please provide the following information:",
  CREATE_ACCOUNT_TO_START: "Create your account to get started",
  DONT_HAVE_ACCOUNT: "Don't have an account yet?",
  EMAIL_VERIFIED_SUCCESS: "Yahoo! You have successfully verified the account.",
  EMAIL_VERIFIED_FAILURE: "Your email address could not be verified.",
  FORGOT_PASSWORD_MESSAGE:
    "Enter you email address below and we'll get you back on track.",
  FORGOT_YOUR_PASSWORD: "Forgot your password?",
  LOGIN_TO_MANAGE: "Login to manage your account",
  NOT_FOUND_MESSAGE_ONE: "Oops! Looks like you followed a bad link.",
  NOT_FOUND_MESSAGE_TWO:
    "If you think this is a problem with us, please tell us",
  NEW_PASSWORD: "Please enter your new password",
  NO_DATA: "Looks Like there are <br /> no snippets",
  NO_TAGS: "No tags found",
  SOMETHING_WENT_WRONG: "Something Went Wrong!",
  VERIFY_EMAIL_ADDRESS: "Verify your email address",
  VERIFY_EMAIL_MESSAGE_1: "We have sent an verification link to {}.",
  VERIFY_EMAIL_MESSAGE_2:
    "Click on the link to complete the verification process.",
  VERIFY_EMAIL_MESSAGE_3: "You might need to check your span folder.",
};

export const TOAST_MSG = {
  CREATE_SNIPPET_SUCCESS: "Snippet Created Successfully",
  CREATE_TAG_SUCCESS: "Tag Created Successfully",
  EMAIL_SENT_SUCCESS: "Email sent successfully",
  FORGOT_PASSWORD_SUCCESS:
    "A password reset link has been sent to your email. Follow the instructions in the email to reset your password",
  LOGIN_SUCCESS: "Welcome Back! Logged In Successfully",
  PASSWORD_UPDATE_SUCCESS: "Password updated succesfully",
  REGISTER_SUCCESS: "Welcome aboard! Your registration was successful",
  RESET_PASSWORD_SUCCESS: "Password Updated Successfully",
  SNIPPET_DELETED_SUCCESS: "Snippet deleted succesfully",
  SNIPPET_RESTORED_SUCCESS: "Snippet restored from trash",
  SNIPPET_TRASH_SUCCESS: "Snippet moved to trash",
  SNIPPET_UPDATE_SUCCESS: "Snippet updated successfully",
  SOMETHING_WENT_WRONG: "Something Went Wrong!",
  TAG_DELETE_SUCCESS: "Tag deleted succesfully",
  TAG_UPDATE_SUCCESS: "Tag updated successfully",
};

export const masonryScreenWidthToColumns = {
  xs: [12],
  sm: [6, 6],
  md: [6, 6],
  lg: [4, 4, 4],
  xl: [3, 3, 3, 3],
};

export const tourSteps = [
  {
    target: "#create-snippet-button",
    disableBeacon: true,
    content: "Click this button to create a new snippet.",
  },
  {
    target: "#create-tag-button",
    content: "Click this button to create a new tag.",
  },
  {
    target: "#all-snippets-button",
    content: "Click this to view all snippets.",
  },
  {
    target: "#favorite-snippets-button",
    content: "Click this to view favorite snippets.",
  },
  {
    target: "#all-tags-button",
    content: "Click this to view tags.",
  },
  {
    target: "#trash-snippets-button",
    content: "Click this to view trashed snippets.",
  },
  {
    target: "#profile-logout-button",
    content: "Click this to update your profile or logout.",
  },
];
