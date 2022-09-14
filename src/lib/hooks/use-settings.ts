import {useAppDispatch, useAppSelector} from '../store';
import {PreferenceState, setPrefs} from '../store/preferences.slice';

export interface SettingsContextValue {
    settings: PreferenceState;
    saveSettings: (update: PreferenceState) => void;
}

export const useSettings = (): SettingsContextValue => {
    const prefs = useAppSelector((state) => state.preference);
    const dispatch = useAppDispatch();

    return {
        settings: prefs,
        saveSettings: (newPrefs) => dispatch(setPrefs(newPrefs))
    };
};
