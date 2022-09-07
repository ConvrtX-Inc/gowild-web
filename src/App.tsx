import { appRoutes } from './app.routes';
import './i18n';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { FC } from 'react';
import { useRoutes } from 'react-router-dom';
import useScrollReset from 'src/lib/hooks/useScrollReset';
import useSettings from 'src/lib/hooks/useSettings';
import RTL from 'src/ui/components/RTL';
import { createCustomTheme } from 'src/ui/theme';

const App: FC = () => {
  const content = useRoutes(appRoutes);
  const { settings } = useSettings();

  useScrollReset();

  const theme = createCustomTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    roundedCorners: settings.roundedCorners,
    theme: settings.theme
  });

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={settings.direction}>
        <CssBaseline />
        {content}
      </RTL>
    </ThemeProvider>
  );
};

export default App;
