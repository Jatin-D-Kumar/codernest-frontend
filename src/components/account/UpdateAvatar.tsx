import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TOAST_MSG } from "../../configs/constants";
import { ApiResponse, ApiErrorResponse } from "../../configs/types";
import { convertToFormData } from "../../helpers/utils";
import { setErrorToast } from "../../redux/features/toastSlice";
import { setUserData } from "../../redux/features/userSlice";
import { useAvatarMutation } from "../../redux/services/authApi";
import Dropzone from "../../styledComponents/Dropzone";
import { RootState } from "../../redux/store";

const UpdateAvatar = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.userData);

  const [updateAvatar, updateAvatarResponse] = useAvatarMutation();

  const handleDrop = async (files: FileList) => {
    const file = files[0];
    if (file) {
      const formData = convertToFormData({ avatar: file });
      await updateAvatar(formData);
    }
  };

  useEffect(() => {
    if (updateAvatarResponse.isSuccess) {
      const { data } = updateAvatarResponse.data as ApiResponse;
      dispatch(setUserData(data));
    }

    if (updateAvatarResponse.isError) {
      const error =
        (updateAvatarResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    updateAvatarResponse.isSuccess,
    updateAvatarResponse.isError,
    updateAvatarResponse.error,
    updateAvatarResponse.data,
  ]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Dropzone
        onDrop={handleDrop}
        selectedImage={userData?.avatar}
        loading={updateAvatarResponse.isLoading}
      />
    </Box>
  );
};

export default UpdateAvatar;
