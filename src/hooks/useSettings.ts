import SettingsContext from '../contexts/SettingsContext';
import type { SettingsContextValue } from '../contexts/SettingsContext';
import { useContext } from 'react';

const useSettings = (): SettingsContextValue => useContext(SettingsContext);

export default useSettings;
