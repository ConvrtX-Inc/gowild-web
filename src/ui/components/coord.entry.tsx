import {FieldLabel} from "./text-field";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material/TextField/TextField";
import {useField} from "formik";
import {useMemo} from "react";
import {AppPoint} from "../../lib/api/go-wild.api";
import {Grid, TextField} from "@mui/material";

export interface CoordEntryProps {
    name: string;
    title: string;
    prefix?: string;
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>;
}

export function CoordEntry({title, name, size, prefix}: CoordEntryProps) {
    const [field, , {setValue, setTouched}] = useField<AppPoint | undefined>(name);
    const {lat, lng} = useMemo(() => {
        if (!field.value) {
            return {lat: undefined, lng: undefined};
        } else {
            return {lat: field.value.coordinates[0], lng: field.value.coordinates[1]};
        }
    }, [field.value]);

    return (
        <Grid xs={12} item>
            <FieldLabel>{title}</FieldLabel>
            <TextField
                sx={{mb: 3}}
                size={size}
                autoComplete='off'
                placeholder={(prefix ?? '') + 'Longitude'}
                name={`${name}.lng`}
                type='number'
                onTouchEnd={event => setTouched(true)}
                onChange={(event) => {
                    const val = event.target.value;
                    if (!val) {
                        return;
                    }

                    let point = field.value;
                    if (!point) {
                        point = {
                            type: 'Point',
                            coordinates: [0, Number(val)],
                        };
                    }
                    setValue(point);
                }}
                value={lng}
                fullWidth
            />
            <TextField
                autoComplete='off'
                placeholder={(prefix ?? '') + 'Latitude'}
                name={`${name}.lat`}
                size={size}
                value={lat}
                type='number'
                onTouchEnd={event => setTouched(true)}
                onChange={(event) => {
                    const val = event.target.value;
                    if (!val) {
                        return;
                    }

                    let point = field.value;
                    if (!point) {
                        point = {
                            type: 'Point',
                            coordinates: [Number(val), 0],
                        };
                    }
                    setValue(point);
                }}
                fullWidth
            />
        </Grid>
    )
}
