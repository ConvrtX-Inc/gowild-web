import {Divider, Grid} from "@mui/material";
import {AppTextField, FieldLabel} from "./text-field";
import {useField} from "formik";
import {RouteHistoricalEvent} from "../../lib/api/go-wild.api";
import {useState} from "react";
import {CoordEntry} from "./coord.entry";
import {FileForm} from "./file-form";

export interface RouteHistoricalFormProps {
    name: string;
}

export function RouteHistoricalForm({name}: RouteHistoricalFormProps) {
    const [field, meta, {setValue, setTouched}] = useField<RouteHistoricalEvent>(name);
    const [expanded, setExpanded] = useState(true);
    return (
        <>
            <Grid mb={4} container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Grid container>
                                <CoordEntry
                                    name={`${name}.point`}
                                    title='Point'
                                    size='small'
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <FieldLabel>Title</FieldLabel>
                                    <AppTextField
                                        name={`${name}.title`}
                                        title='Title'
                                        size='small'
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FieldLabel>Sub-title</FieldLabel>
                                    <AppTextField
                                        name={`${name}.subtitle`}
                                        title='Sub-title'
                                        size='small'
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FieldLabel>Description</FieldLabel>
                            <AppTextField
                                name={`${name}.description`}
                                title='Description'
                                size='small'
                                multiline
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FileForm
                                accept={{'image/*': []}}
                                maxFiles={1}
                                name={`${name}.picture`}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Divider/>
        </>
    );
}

