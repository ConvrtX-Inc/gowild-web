import { Box, Button, Card, TextareaAutosize } from "@material-ui/core";
import { Formik } from "formik";
import { FC, useState } from "react";
import { GuidelineTab } from "src/enums";
import { GuidelineLog } from "src/types/guidelines";
import styled from "styled-components";

import GuidelineTabs from "./GuidelineTabs";
import LogContent from "./LogContent";

const GuidelinesContent: FC = () => {
  const [tabOpen, setTabOpen] = useState<GuidelineTab>(
    GuidelineTab.TermsAndConditions
  );

// TODO: Update state handler to handle asynch
  const [terms, setTerms] = useState<string>(t);
  const [faq, setFaq] = useState<string>(fq);
  const [eWaiver, setEWaiver] = useState<string>(eW);
  const [logs, setLogs] = useState<GuidelineLog[]>(tLogs);

  const [textAreaValue, setTextAreaValue] = useState(t);

  const handleTabChange = (
    event: React.MouseEvent<HTMLElement>,
    tab: GuidelineTab
  ): void => {
    setTabOpen(tab);

    switch (tab) {
      case GuidelineTab.TermsAndConditions:
        setTextAreaValue(terms);
        break;
      case GuidelineTab.FAQ:
        setTextAreaValue(faq);
        break;
      case GuidelineTab.EWaiver:
        setTextAreaValue(eWaiver);
        break;
    }
  };

  return (
    <StyledCard>
      <Box padding={3} sx={{ height: "calc(100% - 101px)" }}>
        <Formik
          initialValues={{ textValue: textAreaValue }}
          onSubmit={async (values, { setSubmitting }): Promise<void> =>
            setLogs((state): GuidelineLog[] => [
              ...state,
              { type: tabOpen, date: new Date() },
            ])
          }
          enableReinitialize
        >
          {({ values, touched, handleBlur, handleSubmit, handleChange }) => (
            <form noValidate onSubmit={handleSubmit} style={{ height: "100%" }}>
              <GuidelineTabs
                tabOpened={tabOpen}
                onTabChange={handleTabChange}
              ></GuidelineTabs>
              <Box display="flex" height="100%" pb={2}>
                <Box flex="3" pr={2}>
                  <GuidelinesTextArea
                    aria-label="Guidlines textarea"
                    value={values.textValue}
                    onBlur={handleBlur("textValue")}
                    onChange={handleChange("textValue")}
                  />
                </Box>
                <Box flex="1">
                  <LogContent logs={logs} />
                </Box>
              </Box>
              <SaveButton $touched={touched.textValue} type="submit">
                Save
              </SaveButton>
            </form>
          )}
        </Formik>
      </Box>
    </StyledCard>
  );
};

export default GuidelinesContent;

const GuidelinesTextArea = styled(TextareaAutosize)`
  && {
    border: 1px solid #e4e4e4;
    border-radius: 20px;
    padding: 1.5em;
    resize: none;
    background-color: #fff;
    outline: none;
    color: #898a8d;
    height: 100% !important;
    width: 100%;
    overflow-y: auto !important;
    line-height: 24px;
    font-family: "Gilroy-Medium";
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


// TODO: Delete these mock data after API integration

const t =
  "Aliquam eu nunc sit amet dolor aliquet elementum. Duis a feugiat nisl. Praesent at enim erat. Suspendisse cursus tristique felis vel dictum. Nam tempus diam ac massa venenatis tempor a ultricies orci. Donec nibh orci, egestas eget lacus sit amet, venenatis egestas odio. Maecenas odio ante, mattis eu faucibus hendrerit, commodo in sapien. In hac habitasse platea dictumst. Curabitur euismod orci dui, a laoreet nulla mattis quis. Sed a elementum nisi, at molestie turpis. Cras finibus nibh sapien, et vulputate sem vulputate a. Maecenas sit amet lacinia lectus. Vivamus in diam ut lorem congue fermentum nec nec lectus. Donec blandit turpis eget finibus rhoncus.";

const fq =
  "Maecenas et erat mattis, molestie felis nec, tincidunt dolor. Mauris tristique gravida justo quis ornare. Duis facilisis nisl ut mi rhoncus, et consequat metus vulputate. Donec et dolor leo. Etiam vitae enim vel sapien placerat luctus et eu metus. Donec feugiat vitae nibh a congue. Praesent nec neque sed arcu fermentum feugiat et sit amet nisl. Aliquam id tristique turpis.";

const eW =
  "Pellentesque accumsan commodo lacus quis dapibus. Duis laoreet felis et ipsum consequat, vitae efficitur lorem ultricies. Phasellus ultricies sed ante sed vulputate. Donec non iaculis turpis. Nulla feugiat mi id enim molestie interdum. Nam erat dolor, finibus sed tincidunt vel, fermentum ac velit. Vivamus ac arcu non augue ornare tincidunt quis vitae urna.";

const tLogs: GuidelineLog[] = [
  {
    date: new Date("December 31, 1975, 23:15:30 GMT+11:00"),
    type: GuidelineTab.TermsAndConditions,
  },
  {
    date: new Date("Jan 1, 2020, 23:15:30 GMT+11:00"),
    type: GuidelineTab.FAQ,
  },
];
