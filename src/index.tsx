import "dotenv/config";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import "nprogress/nprogress.css";
import "./fonts.css";
import "./fonts/Gilroy-Thin.ttf";
import "./fonts/Gilroy-Light.ttf";
import "./fonts/Gilroy-Regular.ttf";
import "./fonts/Gilroy-Medium.ttf";
import "./fonts/Gilroy-SemiBold.ttf";
import "./fonts/Gilroy-Bold.ttf";
import "./fonts/Gilroy-ExtraBold.ttf";
import "./fonts/Gilroy-Black.ttf";
import "./fonts/Gilroy-Heavy.ttf";
import "./fonts/samsungsharpsans.otf";
import "./fonts/samsungsharpsans-medium.otf";
import "./fonts/samsungsharpsans-bold.otf";
import "./fonts/Circular-Std-Bold.ttf";

import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import StyledEngineProvider from "@material-ui/core/StyledEngineProvider";
import App from "./App";
// import { AuthProvider } from './contexts/JWTContext';
import { AuthProvider } from "./contexts/AxiosContext";
import { SettingsProvider } from "./contexts/SettingsContext";
import store from "./store";

ReactDOM.render(
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
  </StrictMode>,
  document.getElementById("root")
);
