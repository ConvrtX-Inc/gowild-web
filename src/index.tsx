import App from './App';
import { SplashScreen } from './ui/components/splash-screen';
import { StyledEngineProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'src/lib/store';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <HelmetProvider>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor} loading={<SplashScreen />}>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LocalizationProvider>
        </StyledEngineProvider>
      </PersistGate>
    </ReduxProvider>
  </HelmetProvider>
);
