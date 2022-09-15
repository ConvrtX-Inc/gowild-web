import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface PreferenceState {
  compact?: boolean;
  direction?: 'ltr' | 'rtl';
  responsiveFontSizes?: boolean;
  roundedCorners?: boolean;
  theme?: string;
}

const initialState: PreferenceState = {};

export const preferenceSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setPrefs: (state, action: PayloadAction<PreferenceState>) => {
      state.compact = action.payload?.compact;
      state.direction = action.payload?.direction;
      state.responsiveFontSizes = action.payload?.responsiveFontSizes;
      state.roundedCorners = action.payload?.roundedCorners;
      state.theme = action.payload?.theme;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setTheme, setPrefs } = preferenceSlice.actions;

export default preferenceSlice.reducer;
