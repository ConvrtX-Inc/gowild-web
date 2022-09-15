import { emptySplitApi } from '../api/empty.api';
import type { AuthState } from './auth.slice';
import { PreferenceState } from './preferences.slice';
import rootReducer from './rootReducer';
import type { Action } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist-indexeddb-storage';
import { PersistConfig } from 'redux-persist/es/types';
import type { ThunkAction } from 'redux-thunk';

const isDev = process.env.REACT_APP_ENABLE_REDUX_DEV_TOOLS === 'true';

const loggerMiddleware = createLogger({
  // to show the difference between what changed in state
  diff: true,

  // to log time
  duration: true,
  timestamp: true,

  // custom colors for each log
  colors: {
    title: () => '#0f1842',
    prevState: () => '#de6f0d',
    action: () => '#6e13ab',
    nextState: () => '#1a9134'
  }
});
const middlewares = [isDev && loggerMiddleware, emptySplitApi.middleware].filter((r) => !!r);

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: storage('go_wild_db')
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: isDev,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middlewares)
});

// For use with persisted gate
export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type RootState = { auth: AuthState; preference: PreferenceState };

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useAppDispatch = () => useReduxDispatch<AppDispatch>();
