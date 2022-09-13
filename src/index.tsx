import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import reportWebVitals from './reportWebVitals';
import {Provider as ReduxProvider} from "react-redux/es/exports";
import {persistor, store} from "./lib/store";
import {PersistGate} from "redux-persist/integration/react";
import {SplashScreen} from "./ui/screens/splash-screen";
import {StyledEngineProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {BrowserRouter} from "react-router-dom";
import {HelmetProvider} from "react-helmet-async";

// TODO Enable Strict mode
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <HelmetProvider>
            <ReduxProvider store={store}>
                <PersistGate persistor={persistor} loading={<SplashScreen/>}>
                    <StyledEngineProvider injectFirst>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <BrowserRouter>
                                <App/>
                            </BrowserRouter>
                        </LocalizationProvider>
                    </StyledEngineProvider>
                </PersistGate>
            </ReduxProvider>
        </HelmetProvider>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
