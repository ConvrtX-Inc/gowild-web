import { ToggleButton, ToggleButtonGroup } from "@material-ui/core";
import { FC, } from "react";
import styled from "styled-components";
import { GuidelineTab } from "../../../enums";

interface GuidelineTabsProps {
  tabOpened: GuidelineTab;
  onTabChange: (
    event: React.MouseEvent<HTMLElement>,
    tab: GuidelineTab
  ) => void;
}

const GuidelineTabs: FC<GuidelineTabsProps> = ({ tabOpened, onTabChange }) => {
  return (
    <GuidelineTabsGroup
      value={tabOpened}
      exclusive
      onChange={onTabChange}
      aria-label="Guideline Tabs"
      sx={{
        px: "1em",
      }}
    >
      <GuidelineTabElem
        value={GuidelineTab.TermsAndConditions}
        aria-label={GuidelineTab.TermsAndConditions}
      >
        {GuidelineTab.TermsAndConditions}
      </GuidelineTabElem>

      <GuidelineTabElem value={GuidelineTab.FAQ} aria-label={GuidelineTab.FAQ}>
        {GuidelineTab.FAQ}
      </GuidelineTabElem>

      <GuidelineTabElem
        value={GuidelineTab.EWaiver}
        aria-label={GuidelineTab.EWaiver}
      >
        {GuidelineTab.EWaiver}
      </GuidelineTabElem>
    </GuidelineTabsGroup>
  );
};

const GuidelineTabsGroup = styled(ToggleButtonGroup)`
  && {
    color: #c0c0c0;
    font-family: "Gilroy-Bold";
  }
`;

const GuidelineTabElem = styled(ToggleButton)`
  && {
    border: 0;
    border-radius: 0;
    &.MuiToggleButton-root {
      color: #c0c0c0;
    }
    &.Mui-selected {
      background-color: transparent;
      color: #000000;
      border-bottom: 3px solid #e4572e;
    }
  }
`;

export default GuidelineTabs;
