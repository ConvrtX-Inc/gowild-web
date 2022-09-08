import { THEMES } from '../../constants';
import useSettings from '../../lib/hooks/use-settings';
import MoonIcon from '../icons/Moon';
import SunIcon from '../icons/Sun';
import { createCustomTheme } from '../theme';
import { Card, CardHeader, Divider, IconButton, ThemeProvider } from '@mui/material';
import PropTypes from 'prop-types';
import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface DemoPreviewerProps {
  element: ReactNode;
  name: string;
}

const WidgetPreviewer: FC<DemoPreviewerProps> = (props) => {
  const { element, name, ...other } = props;
  const { settings } = useSettings();
  const [selectedTheme, setSelectedTheme] = useState(settings.theme);

  useEffect(() => {
    setSelectedTheme(settings.theme);
  }, [settings.theme]);

  const handleSwitch = () =>
    setSelectedTheme((prevSelectedTheme) => {
      if (prevSelectedTheme === THEMES.LIGHT) {
        if (settings.theme === THEMES.LIGHT) {
          return THEMES.DARK;
        }

        return settings.theme;
      }

      return THEMES.LIGHT;
    });

  const theme = createCustomTheme({
    ...settings,
    theme: selectedTheme
  });

  return (
    <Card variant='outlined' sx={{ mb: 8 }} {...other}>
      <CardHeader
        action={
          <IconButton onClick={handleSwitch}>
            {selectedTheme === 'LIGHT' ? (
              <MoonIcon fontSize='small' />
            ) : (
              <SunIcon fontSize='small' />
            )}
          </IconButton>
        }
        title={name}
      />
      <Divider />
      <ThemeProvider theme={theme}>{element}</ThemeProvider>
    </Card>
  );
};

WidgetPreviewer.propTypes = {
  element: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired
};

export default WidgetPreviewer;