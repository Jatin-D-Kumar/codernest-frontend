import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";
import { snippetSchema } from "../../schemas/snippet";
import FormikTextField from "../../styledComponents/FormikTextField";
import { Add } from "@mui/icons-material";
import CodeEditor from "../../styledComponents/CodeEditor";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditSnippet,
  setSnippetForm,
} from "../../redux/features/snippetSlice";
import {
  useCreateSnippetMutation,
  useGetSnippetByIdQuery,
  useUpdateSnippetMutation,
} from "../../redux/services/snippetsApi";
import LoadingButton from "../../styledComponents/LoadingButton";
import { useEffect, useState } from "react";
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
import { setTagForm } from "../../redux/features/tagSlice";
import {
  ApiErrorResponse,
  ApiResponse,
  Language,
  Tag,
} from "../../configs/types";
import { useGetAllLanguagesQuery } from "../../redux/services/languagesApi";

const SnippetForm = () => {
  const dispatch = useDispatch();
  const {
    snippetForm,
    isEdit = false,
    snippetId = null,
  } = useSelector((state: RootState) => state.snippet);
  const { tagList } = useSelector((state: RootState) => state.tag);

  const [languages, setLanguages] = useState<Language[]>([]);

  const [createSnippet, createSnippetResponse] = useCreateSnippetMutation();
  const [updateSnippet, updateSnippetResponse] = useUpdateSnippetMutation();

  const getSnippetsQuery = useGetSnippetByIdQuery(
    { id: snippetId },
    {
      skip: isEdit ? false : true,
    }
  );

  const getLanguagesQuery = useGetAllLanguagesQuery(null);

  const handleSubmit = async (
    values: {
      title: string;
      description: string;
      code: string;
      language: string;
      tags: [];
    },
    formikHelpers: FormikHelpers<{
      title: string;
      description: string;
      code: string;
      language: string;
      tags: [];
    }>
  ): Promise<void | Promise<any>> => {
    const payload = {
      ...values,
      tags: values.tags.map((tag: Tag) => tag.id),
      language: languages.find(
        (language: Language) => language.value === values.language
      )?.id,
      id: snippetId ? snippetId : undefined,
    };
    isEdit ? await updateSnippet(payload) : await createSnippet(payload);
    formikHelpers.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      code: "",
      language: "javascript",
      tags: [],
    },
    validationSchema: snippetSchema,
    validateOnBlur: false,
    onSubmit: handleSubmit,
  });

  const { setFieldValue } = formik;

  useEffect(() => {
    if (createSnippetResponse.isSuccess || updateSnippetResponse.isSuccess) {
      const successMsg = updateSnippetResponse.isSuccess
        ? TOAST_MSG.SNIPPET_UPDATE_SUCCESS
        : TOAST_MSG.CREATE_SNIPPET_SUCCESS;
      dispatch(setSuccessToast(successMsg));
      if (updateSnippetResponse.isSuccess) {
        dispatch(setEditSnippet({ isEdit: false, id: null }));
        updateSnippetResponse.reset();
      } else {
        createSnippetResponse.reset();
      }
      dispatch(setSnippetForm(false));
    }
    if (createSnippetResponse.isError || updateSnippetResponse.isError) {
      const error =
        (createSnippetResponse.error as ApiErrorResponse)?.data?.message ||
        (updateSnippetResponse.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    createSnippetResponse,
    createSnippetResponse.isError,
    createSnippetResponse.isSuccess,
    updateSnippetResponse,
    updateSnippetResponse.isError,
    updateSnippetResponse.isSuccess,
  ]);

  useEffect(() => {
    if (getSnippetsQuery.isSuccess) {
      const { data } = getSnippetsQuery.data as ApiResponse;
      const { title, description, code, tags, language } = data as any;
      setFieldValue(FIELD_NAME.TITLE, title);
      setFieldValue(FIELD_NAME.DESCRIPTION, description);
      setFieldValue(FIELD_NAME.CODE, code);
      setFieldValue(
        FIELD_NAME.TAGS,
        tags?.map((tag: any) => {
          return { id: tag._id, name: tag.name };
        })
      );
      setFieldValue(FIELD_NAME.LANGUAGE, language?.value);
    }
    if (getSnippetsQuery.isError) {
      const error =
        (getSnippetsQuery.error as ApiErrorResponse)?.data?.message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    dispatch,
    getSnippetsQuery,
    getSnippetsQuery.isError,
    getSnippetsQuery.isSuccess,
    setFieldValue,
  ]);

  const handleClose = () => {
    isEdit && dispatch(setEditSnippet({ isEdit: false, id: null }));
    dispatch(setSnippetForm(false));
    formik.resetForm();
  };

  const handleAddTagClick = () => {
    dispatch(setTagForm(true));
  };

  useEffect(() => {
    if (getLanguagesQuery.isSuccess) {
      const { data } = getLanguagesQuery.data as ApiResponse;
      const formattedLanguageList: Language[] = data.map((language: any) => {
        return {
          id: language._id,
          title: language.title,
          value: language.value,
        };
      });
      setLanguages(formattedLanguageList);
    }

    if (getLanguagesQuery.isError) {
      const error =
        (getLanguagesQuery.data as ApiResponse).message ||
        TOAST_MSG.SOMETHING_WENT_WRONG;
      dispatch(setErrorToast(error));
    }
  }, [
    getLanguagesQuery.isSuccess,
    getLanguagesQuery.isError,
    getLanguagesQuery.data,
    dispatch,
  ]);

  return (
    <Dialog
      open={snippetForm}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: formik.handleSubmit,
      }}
    >
      <DialogTitle>
        {isEdit ? TEXT.EDIT_SNIPPET : TEXT.CREATE_SNIPPET}
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12}>
            <FormikTextField
              type="text"
              id={FIELD_NAME.TITLE}
              name={FIELD_NAME.TITLE}
              label={LABEL.TITLE}
              variant="outlined"
              fullWidth
              size="small"
              sx={{ my: 2 }}
              formik={formik}
            />
          </Grid>
          <Grid item xs={12}>
            <FormikTextField
              type="text"
              id={FIELD_NAME.DESCRIPTION}
              name={FIELD_NAME.DESCRIPTION}
              label={LABEL.DESCRIPTION}
              variant="outlined"
              fullWidth
              size="small"
              sx={{ mb: 2 }}
              formik={formik}
            />
          </Grid>
          <Grid item container xs={12} spacing={1} alignItems={"center"}>
            <Grid item xs={12} sm={10}>
              <Autocomplete
                multiple
                id={FIELD_NAME.TAGS}
                size="small"
                options={tagList}
                value={formik.values.tags}
                onChange={(event, newValue) => {
                  formik.setFieldValue(FIELD_NAME.TAGS, newValue);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={LABEL.TAGS}
                    placeholder={LABEL.TAGS}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                size="medium"
                startIcon={<Add />}
                onClick={handleAddTagClick}
              >
                {CLICK_TEXT.TAG}
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={12}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={2}
          >
            <FormLabel>{LABEL.CODE}</FormLabel>
            {languages.length && (
              <Grid item xs={7} sm={3}>
                <Select
                  id={FIELD_NAME.LANGUAGE}
                  name={FIELD_NAME.LANGUAGE}
                  size="small"
                  value={formik.values.language}
                  defaultValue={languages[0].value}
                  onChange={(event) => {
                    formik.setFieldValue(
                      FIELD_NAME.LANGUAGE,
                      event.target.value
                    );
                  }}
                  variant="standard"
                  placeholder={LABEL.LANGUAGE}
                  fullWidth
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                >
                  {languages.map((language: Language) => (
                    <MenuItem key={language.id} value={language.value}>
                      {language.title}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            )}
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              ".ace_mobile-menu": {
                display: "none",
              },
            }}
          >
            <CodeEditor
              mode={formik.values.language}
              readOnly={false}
              showGutter={true}
              editorHeight={250}
              handleChange={(value: string) =>
                formik.setFieldValue(FIELD_NAME.CODE, value)
              }
              code={formik.values.code}
              highlightActiveLine={true}
            />
            <FormHelperText>
              {formik.touched.code && formik.errors.code}
            </FormHelperText>
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
          loading={createSnippetResponse.isLoading}
        >
          {isEdit ? CLICK_TEXT.EDIT : CLICK_TEXT.CREATE}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SnippetForm;
