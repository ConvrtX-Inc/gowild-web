import App from './App';
// import { AuthProvider } from './contexts/JWTContext';
import { AuthProvider } from './contexts/AxiosContext';
import { SettingsProvider } from './contexts/SettingsContext';
import './fonts.css';
import './fonts/Circular-Std-Bold.ttf';
import './fonts/Gilroy-Black.ttf';
import './fonts/Gilroy-Bold.ttf';
import './fonts/Gilroy-ExtraBold.ttf';
import './fonts/Gilroy-Heavy.ttf';
import './fonts/Gilroy-Light.ttf';
import './fonts/Gilroy-Medium.ttf';
import './fonts/Gilroy-Regular.ttf';
import './fonts/Gilroy-SemiBold.ttf';
import './fonts/Gilroy-Thin.ttf';
import './fonts/samsungsharpsans-bold.otf';
import './fonts/samsungsharpsans-medium.otf';
import './fonts/samsungsharpsans.otf';
import store from './store';
import StyledEngineProvider from '@material-ui/core/StyledEngineProvider';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import 'dotenv/config';
import 'nprogress/nprogress.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { HelmetProvider } from 'react-helmet-async';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-quill/dist/quill.snow.css';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <StyledEngineProvider injectFirst>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <BrowserRouter>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </BrowserRouter>
            </SettingsProvider>
          </LocalizationProvider>
        </StyledEngineProvider>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>
);
