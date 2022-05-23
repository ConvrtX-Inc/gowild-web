import {
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { GuidelineType } from "src/enums";
import { AbsCircularLoadingBox } from "src/shared-styled-components/dashboard";
import { Guideline, GuidelineLog } from "src/types/guidelines";
import styled from "styled-components";
import * as Yup from "yup";
import {
  getGuidelinelogs,
  createGuideline,
  updateGuideline,
  getGuidelines,
} from "./guidelines-api";

import GuidelineTabs from "./GuidelineTabs";
import LogContent from "./LogContent";

type GuidelinesMenu = {
  [GuidelineType.TERMS_AND_CONDITIONS]: Guideline;
  [GuidelineType.FAQ]: Guideline;
  [GuidelineType.E_WAIVER]: Guideline;
};

const GuidelineSchema = Yup.object().shape({
  description: Yup.string().required("This field must have a value"),
});

const GuidelinesContent: FC = () => {
  const [guidelines, setGuidelines] = useState<GuidelinesMenu>({
    [GuidelineType.TERMS_AND_CONDITIONS]: null,
    [GuidelineType.FAQ]: null,
    [GuidelineType.E_WAIVER]: null,
  });
  const [logs, setLogs] = useState<GuidelineLog[]>([]);
  const [tabOpen, setTabOpen] = useState<GuidelineType>(
    GuidelineType.TERMS_AND_CONDITIONS
  );
  const [textAreaValue, setTextAreaValue] = useState<string>("");

  const onUpdateGuideline = async (
    guideline: Guideline,
    updateDescription: string
  ): Promise<boolean> => {
    try {
      const updateAPIResponse = await updateGuideline(
        guideline,
        updateDescription
      );
      if (updateAPIResponse.status === 200) {
        const logRepsonse = await getGuidelinelogs();
        setLogs(logRepsonse.data);
        setGuidelines((guidelines) => {
          return {
            ...guidelines,
            [guideline.type]: updateAPIResponse.data,
          };
        });

        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const newGuideline = async (
    type: GuidelineType,
    description: string
  ): Promise<boolean> => {
    try {
      const updateAPIResponse = await createGuideline(type, description);
      if (updateAPIResponse.status === 201) {
        const logRepsonse = await getGuidelinelogs();
        setLogs(logRepsonse.data);
        setGuidelines((guidelines) => {
          return {
            ...guidelines,
            [type]: updateAPIResponse.data,
          };
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    tab: GuidelineType
  ): void => {
    if (tab === null || !textAreaValue) return;
    setTabOpen(tab);
    switch (tab) {
      case GuidelineType.TERMS_AND_CONDITIONS:
        setTextAreaValue(
          guidelines[GuidelineType.TERMS_AND_CONDITIONS]?.description || ""
        );
        break;
      case GuidelineType.FAQ:
        setTextAreaValue(guidelines[GuidelineType.FAQ]?.description || "");
        break;
      case GuidelineType.E_WAIVER:
        setTextAreaValue(guidelines[GuidelineType.E_WAIVER]?.description || "");
        break;
    }
  };

  const getRecentGuidelines = (list: Guideline[]) => {
    list.some((guideline) => {
      if (
        guidelines[GuidelineType.TERMS_AND_CONDITIONS] &&
        guidelines[GuidelineType.FAQ] &&
        guidelines[GuidelineType.E_WAIVER]
      ) {
        return true;
      }
      if (
        !guidelines[guideline.type] &&
        Object.values(GuidelineType).includes(guideline.type)
      ) {
        if (guideline.type === GuidelineType.TERMS_AND_CONDITIONS) {
          setTextAreaValue(guideline.description);
        }
        setGuidelines((g) => ({
          ...g,
          [guideline.type]: guideline,
        }));
      }
      return false;
    });
  };

  useEffect(() => {
    const initData = async () => {
      try {
        const guidelinesResponse = await getGuidelines();
        const logRepsonse = await getGuidelinelogs();
        setLogs(logRepsonse.data);
        getRecentGuidelines(guidelinesResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StyledCard>
      <Box padding={3} sx={{ height: "calc(100% - 101px)" }}>
        <Formik
          validationSchema={GuidelineSchema}
          initialValues={{ description: textAreaValue }}
          onSubmit={async (
            values,
            { setSubmitting, setTouched }
          ): Promise<void> => {
            setSubmitting(true);
            if (guidelines[tabOpen]) {
              await onUpdateGuideline(guidelines[tabOpen], values.description);
            } else {
              await newGuideline(tabOpen, values.description);
            }

            setSubmitting(false);
            setTouched({}, false);
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
            isSubmitting,
          }) => (
            <form noValidate onSubmit={handleSubmit} style={{ height: "100%" }}>
              <GuidelineTabs
                tabOpened={tabOpen}
                onTabChange={handleTabChange}
              ></GuidelineTabs>
              <Box display="flex" height="100%" pb={2}>
                <Box
                  flex="3"
                  pr={2}
                  sx={{
                    position: "relative",
                  }}
                >
                  {textAreaValue ? (
                    <GuidelinesTextArea
                      multiline={true}
                      aria-label="Guidelines description"
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={Boolean(errors.description)}
                      helperText={errors.description}
                    />
                  ) : (
                    <AbsCircularLoadingBox>
                      <CircularProgress />
                    </AbsCircularLoadingBox>
                  )}
                </Box>
                <Box flex="1">
                  <LogContent logs={logs} />
                </Box>
              </Box>
              <SaveButton
                $touched={touched.description}
                type="submit"
                disabled={!textAreaValue || isSubmitting}
              >
                {!isSubmitting ? (
                  "Save"
                ) : (
                  <CircularProgress
                    size={20}
                    sx={{
                      color: "#2995a8",
                    }}
                  />
                )}
              </SaveButton>
            </form>
          )}
        </Formik>
      </Box>
    </StyledCard>
  );
};

export default GuidelinesContent;

const GuidelinesTextArea = styled(TextField)`
  && {
    resize: none;
    background-color: #fff;
    outline: none;
    width: 100%;
    height: 100%;

    && fieldset {
      border-color: transparent;
    }

    && .MuiInputBase-multiline {
      height: 100%;
      border: 1px solid #e4e4e4;
      border-radius: 20px;
    }

    && textarea {
      height: 100% !important;
      overflow-y: auto !important;
      font-family: "Gilroy Medium";
      color: #898a8d;
      line-height: 30px;
      font-size: 16px;
    }

    && .MuiInputBase-multiline.Mui-focused fieldset {
      border-width: 2px !important;
      border-color: #2995a8;
      border-style: solid;
    }

    && .MuiFormHelperText-root {
      font-family: "Gilroy Regular";
    }
  }
`;

const SaveButton = styled(Button)`
  && {
    background-color: ${(props) => (props.$touched ? "#1D140C" : "#021f3d")};
    color: #fff;
    height: 50px;
    width: 177px;
  }
`;
const StyledCard = styled(Card)`
  && {
    box-shadow: none;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
`;
