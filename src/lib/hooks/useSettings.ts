import { useAppDispatch, useAppSelector } from '../store';
import { PreferenceState, setPrefs } from '../store/preferences.slice';

export interface SettingsContextValue {
  settings: PreferenceState;
  saveSettings: (update: PreferenceState) => void;
}

export const useSettings = (): SettingsContextValue => {
  const prefs = useAppSelector((state) => state.preference);
  const dispatch = useAppDispatch();
  const saveSettings = (newPrefs) => dispatch(setPrefs(newPrefs));

  return {
    settings: prefs,
    saveSettings: saveSettings
  };
};

export default useSettings;
