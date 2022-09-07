import { Box, Button, TextField } from '@mui/material';
import { debounce } from 'lodash';
import { FC, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/store';
import FilterTriangle from 'src/ui/icons/FilterTriangle';
import Search from 'src/ui/icons/Search';
import { DashboardButton } from 'src/ui/style/dashboard';
import styled from 'styled-components';

const TableHeadActions: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { isFiltered } = {} as any;
  const dispatch = useAppDispatch();

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const debouncedSearch = useCallback(debounce(handleSearch, 0), []);

  const onSearchFilter = (e) => {
    const { value } = e.target;
    debouncedSearch(value);
  };

  const handleFilter = () => {};

  return (
    <TableHeadBox>
      <Box>
        <FilterButton onClick={handleFilter}>
          <FilterTriangle viewBox='0 0 20 20' />
          {!isFiltered ? 'Filter' : 'Unfilter'}
        </FilterButton>
        <SearchBar
          placeholder='Search Users by Name, Email or Date'
          InputProps={{
            startAdornment: <Search />
          }}
          onChange={onSearchFilter}
          value={searchValue}
        />
      </Box>
      <Box>
        <StyledButton>Add New </StyledButton>
      </Box>
    </TableHeadBox>
  );
};

export default TableHeadActions;

const FilterButton = styled(Button)`
  && {
    display: flex;
    justify-content: center;
    align-items: center;
    && svg {
      margin-right: 10px;
    }
    font-size: 16px;
    font-family: 'Inter';
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #25213b;

    background: transparent;
    border: 1px solid rgba(255, 120, 81, 0.2);
    border-radius: 6px;
    margin-right: 20px;
    &:hover {
      border: 2px solid rgba(255, 120, 81, 0.2) !important;
    }
  }
`;

const StyledButton = styled(DashboardButton)`
  && {
    margin: 0 9px;
    height: 40px;
  }
`;

const SearchBar = styled(TextField)`
  && {
    border-radius: 6px;
    && svg {
      margin-right: 10px;
    }
    && .MuiInputBase-root {
      width: 392px;
      height: 40px;
      padding: 10px;
      border-radius: 6px;
    }

    && .Mui-focused fieldset {
      border: 2px solid rgba(255, 120, 81, 0.2);
    }

    && input {
      font-family: 'Inter';
      font-size: 12px;
      color: #000;
      outline: none;
      &::placeholder {
        color: #000;
      }
    }

    &:hover fieldset {
      border: 2px solid rgba(255, 120, 81, 0.2) !important;
    }

    && fieldset {
      border: 1px solid rgba(255, 120, 81, 0.2);
      border-radius: 6px;
    }
  }
`;

const TableHeadBox = styled(Box)`
  && {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
    height: 100%;
    width: 100%;
    > * {
      &:first-child {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
      &:last-child {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    && svg {
      color: #ff7851 !important;
    }
  }
`;
