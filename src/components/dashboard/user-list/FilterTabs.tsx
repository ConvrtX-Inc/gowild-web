import { ToggleButton } from "@material-ui/core";
import { ToggleButtonGroup } from "@mui/material";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserFilterTab } from "src/enums/user-list";
import { onUserFilterChange } from "src/slices/user-list";
import { AppDispatch, RootState } from "src/store";
import styled from "styled-components";

const FilterTabs: FC = () => {
  const userFilterTab = useSelector(
    (state: RootState) => state.userList.userFilterTab
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    tab: UserFilterTab
  ): void => {
    if (tab === null) return;
    dispatch(onUserFilterChange(tab));
  };

  return (
    <>
      <FilterTabButtonGroup
        exclusive
        value={userFilterTab}
        onChange={handleChange}
      >
        <FilterTabElem value={UserFilterTab.ALL}>
          {UserFilterTab.ALL}
        </FilterTabElem>
        <FilterTabElem value={UserFilterTab.ACTIVE}>
          {UserFilterTab.ACTIVE}
        </FilterTabElem>
        <FilterTabElem value={UserFilterTab.DISABLED}>
          {UserFilterTab.DISABLED}
        </FilterTabElem>
      </FilterTabButtonGroup>
      <HorizontalLine />
    </>
  );
};

export default FilterTabs;

const HorizontalLine = styled.hr`
  && {
    margin: 0;
    padding: 0;
    color: #c6c2de;
  }
`;

const FilterTabButtonGroup = styled(ToggleButtonGroup)`
  && {
  }
`;

const FilterTabElem = styled(ToggleButton)`
  && {
    border: 0;
    border-radius: 0;
    &.MuiToggleButton-root {
      font-family: "Inter";
      font-weight: 500;
      font-size: 14px;
      line-height: 16.94px;
      padding: 10px 20px;
      color: rgba(37, 33, 59, 0.5);
    }
    &.Mui-selected {
      background-color: transparent;
      color: #000000;
      border-bottom: 3px solid #e4572e;
      color: rgb(37, 33, 59);
    }
  }
`;
