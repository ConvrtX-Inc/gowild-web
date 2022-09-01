import { GuidelineType } from '../../../enums';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';

interface GuidelineTabsProps {
  tabOpened: GuidelineType;
  onTabChange: (event: React.MouseEvent<HTMLElement>, tab: GuidelineType) => void;
}

const GuidelineTabs: FC<GuidelineTabsProps> = ({ tabOpened, onTabChange }) => {
  return (
    <GuidelineTabsGroup
      value={tabOpened}
      exclusive
      onChange={onTabChange}
      aria-label='Guideline Tabs'
      sx={{
        px: '1em'
      }}
    >
      <GuidelineTabElem
        value={GuidelineType.TERMS_AND_CONDITIONS}
        aria-label={GuidelineType.TERMS_AND_CONDITIONS}
      >
        Terms & Condition
      </GuidelineTabElem>

      <GuidelineTabElem value={GuidelineType.FAQ} aria-label={GuidelineType.FAQ}>
        FAQ
      </GuidelineTabElem>

      <GuidelineTabElem value={GuidelineType.E_WAIVER} aria-label={GuidelineType.E_WAIVER}>
        E - Waiver
      </GuidelineTabElem>
    </GuidelineTabsGroup>
  );
};

const GuidelineTabsGroup = styled(ToggleButtonGroup)``;

const GuidelineTabElem = styled(ToggleButton)`
  && {
    border: 0;
    border-radius: 0;
    width: 175px;
    &.MuiToggleButton-root {
      color: #c0c0c0;
      font-family: 'Gilroy Bold';
      font-weight: 400;
    }
    &.Mui-selected {
      background-color: transparent;
      color: #000000;
      border-bottom: 3px solid #e4572e;
    }
  }
`;

export default GuidelineTabs;
