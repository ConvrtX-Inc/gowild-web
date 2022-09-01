import type { AppThunk } from '../store';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface RouteListState {
  onDeleteOneRoute: boolean;
  setIsLoading: boolean;
}

const initialState: RouteListState = {
  onDeleteOneRoute: false,
  setIsLoading: true
};

const slice = createSlice({
  name: 'routeList',
  initialState,
  reducers: {
    refreshListOnDelete(state: RouteListState, action: PayloadAction<boolean>): void {
      state.onDeleteOneRoute = action.payload;
    },
    setRouteListIsLoading(state: RouteListState, action: PayloadAction<boolean>): void {
      state.setIsLoading = action.payload;
    }
  }
});

export const { reducer } = slice;

export const refreshListOnDelete =
  (onDeleteOneRoute: boolean): AppThunk =>
  (dispatch): void => {
    dispatch(slice.actions.refreshListOnDelete(onDeleteOneRoute));
  };

export const setRouteListIsLoading =
  (setIsLoading: boolean): AppThunk =>
  (dispatch): void => {
    dispatch(slice.actions.setRouteListIsLoading(setIsLoading));
  };

export default slice;
