import {CssBaseline, ThemeProvider} from '@mui/material';
import {useRoutes} from 'react-router-dom';
import {useScrollReset} from "./lib/hooks/use-scroll-reset";
import {useSettings} from "./lib/hooks/use-settings";
import {Rtl} from "./ui/components/rtl";
import {createCustomTheme} from "./ui/common/theme";
import {useMemo} from "react";
import {appRoutes} from "./ui/app-routes";

export function Entry() {
    const content = useRoutes(appRoutes);
    const {settings} = useSettings();

    useScrollReset();

    const theme = useMemo(() => createCustomTheme({
        direction: settings.direction,
        responsiveFontSizes: settings.responsiveFontSizes,
        roundedCorners: settings.roundedCorners,
        theme: settings.theme
    }), [settings]);

    return (
        <ThemeProvider theme={theme}>
            <Rtl direction={settings.direction!}>
                <CssBaseline/>
                {content}
            </Rtl>
        </ThemeProvider>
    );
}
