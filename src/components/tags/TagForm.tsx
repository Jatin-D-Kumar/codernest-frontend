import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import FormikTextField from "../../styledComponents/FormikTextField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useCreateTagMutation,
  useUpdateTagMutation,
} from "../../redux/services/tagsApi";
import { FormikHelpers, useFormik } from "formik";
import { tagSchema } from "../../schemas/tag";
import { useEffect } from "react";
import {
  setErrorToast,
  setSuccessToast,
} from "../../redux/features/toastSlice";
import {
  CLICK_TEXT,
  FIELD_NAME,
  LABEL,
  TEXT,
  TOAST_MSG,
} from "../../configs/constants";
import { setEditTag, setTagForm } from "../../redux/features/tagSlice";
import LoadingButton from "../../styledComponents/LoadingButton";
import { ApiErrorResponse } from "../../configs/types";

const TagForm = () => {
  const dispatch = useDispatch();
  const {
    tagForm,
    isEdit = false,
    tag,
  } = useSelector((state: RootState) => state.tag);

  const [createTag, createTagResponse] = useCreateTagMutation();
  const [editTag, editTagResponse] = useUpdateTagMutation();

  const handleSubmit = async (
    values: {
      name: string;
    },
    formikHelpers: FormikHelpers<{
      name: string;
    }>
  ): Promise<void | Promise<any>> => {
    const payload = {
      name: values.name,
      id: isEdit ? tag.id : undefined,
    };
    isEdit ? await editTag(payload) : await createTag(payload);
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: tagSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    if (isEdit) {
      setFieldValue(FIELD_NAME.NAME, tag.name);
    }
  }, [isEdit, setFieldValue, tag.name]);

  useEffect(() => {
    if (createTagResponse.isSuccess || editTagResponse.isSuccess) {
      const sucessMsg = createTagResponse.isSuccess
        ? TOAST_MSG.CREATE_TAG_SUCCESS
        : TOAST_MSG.TAG_UPDATE_SUCCESS;
      dispatch(setSuccessToast(sucessMsg));
      if (createTagResponse.isSuccess) {
        createTagResponse.reset();
      } else {
        editTagResponse.reset();
        dispatch(setEditTag({ isEdit: false, tag: { id: "", name: "" } }));
      }
      dispatch(setTagForm(false));
    }
    if (createTagResponse.isError) {
      const error =
        (createTagResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    createTagResponse,
    createTagResponse.isError,
    createTagResponse.isSuccess,
    editTagResponse,
    editTagResponse.isError,
    editTagResponse.isSuccess,
  ]);

  const handleClose = () => {
    if (isEdit) {
      dispatch(setEditTag({ isEdit: false, tag: { id: "", name: "" } }));
    }
    dispatch(setTagForm(false));
    formik.resetForm();
  };

  return (
    <Dialog
      open={tagForm}
      onClose={handleClose}
      maxWidth={"xs"}
      fullWidth
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
      }}
    >
      <DialogTitle>{isEdit ? TEXT.EDIT_TAG : TEXT.CREATE_TAG}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <FormikTextField
              autoFocus
              type="text"
              id={FIELD_NAME.NAME}
              name={FIELD_NAME.NAME}
              label={LABEL.TAG_NAME}
              variant="outlined"
              fullWidth
              sx={{ mt: 1 }}
              size="small"
              formik={formik}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button size="medium" onClick={handleClose}>
          {CLICK_TEXT.CANCEL}
        </Button>
        <LoadingButton
          size="medium"
          type="submit"
          loading={createTagResponse.isLoading}
        >
          {isEdit ? CLICK_TEXT.EDIT : CLICK_TEXT.CREATE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default TagForm;
