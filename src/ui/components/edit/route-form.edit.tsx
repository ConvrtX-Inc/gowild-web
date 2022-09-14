import {FoundComponent} from "../../../types/finder";
import {
    Route,
    useCreateOneBaseRouteControllerRouteMutation,
    useUpdateOneBaseRouteControllerRouteMutation
} from "../../../lib/api/go-wild.api";
import {Helmet} from "react-helmet-async";
import {useCallback, useMemo} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper
} from "@mui/material";
import {FieldArray, Form, Formik} from "formik";
import {Place} from "@mui/icons-material";
import {AppTextField, FieldLabel} from "../text-field";
import {ActionButton} from "../buttons";
import {CoordEntryForm} from "../forms/coord-entry.form";
import {HistoricalEventsTitle} from "../title";
import {OrangeBorder} from "../orange-banner";
import {RouteHistoricalForm} from "../forms/route-historical.form";
import {FileForm} from "../forms/file-form";
import {RouteMapForm} from "../forms/route-map.form";
import {routeValidationSchema} from "../../../lib/validation-schemas";
import {useMounted} from "../../../lib/hooks/use-mounted";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {FormikHelpers} from "formik/dist/types";
import {getLogger} from "../../../lib/logging";
import {useAuth} from "../../../lib/hooks/use-auth";

const logger = getLogger('Route-Form');

export function RouteFormEdit({item}: FoundComponent<Route | undefined>) {
    const isNew = useMemo(() => !item?.id, [item?.id]);
    const isMounted = useMounted();
    const navigate = useNavigate();
    const [createRoute] = useCreateOneBaseRouteControllerRouteMutation();
    const [updateRoute] = useUpdateOneBaseRouteControllerRouteMutation();
    const {sub} = useAuth();

    // Scrollable
    const scrollToHistoricalEvents = () => {
    };
    const scrollToHistoricalForm = () => {
    };

    const onSuccess = useCallback((route: Route, actions) => {
        if (isNew) {
            const {id: routeId} = route;
            navigate('/dashboard/route-lists/' + routeId);
        } else {
            if (isMounted) {
                actions.setSubmitting(false);
                toast('Route saved');
            }
        }
    }, [isMounted, isNew, navigate])

    const onError = (err) => {
        logger.error('Could not save route', err);
        toast('Could not save route');
    }

    const onSubmit = useCallback(async (values: Route, actions: FormikHelpers<Route>) => {
        console.log('isNew', isNew, item?.id);
        if (isNew) {
            const result = await createRoute({route: values})
            if ('data' in result) {
                onSuccess(result.data, actions);
            } else {
                onError(result.error);
            }
        } else {
            const result = await updateRoute({route: values, id: item!.id!});
            if ('data' in result) {
                onSuccess(result.data, actions);
            } else {
                onError(result.error);
            }
        }
    }, [createRoute, isNew, item, onSuccess, updateRoute]);

    return (
        <>
            <Helmet>
                <title>{item?.title} | Route | Go Wild</title>
            </Helmet>

            <Formik<Route>
                validationSchema={routeValidationSchema}
                initialValues={{
                    id: item?.id,
                    createdDate: item?.createdDate,
                    updatedDate: item?.updatedDate,
                    user: item?.user ?? sub as any,
                    title: item?.title ?? '',
                    start: item?.start ?? '' as any,
                    end: item?.end ?? '' as any,
                    historicalEvents: item?.historicalEvents ?? [],
                    picture: item?.picture ?? '' as any,
                    description: item?.description ?? '',
                }}
                onSubmit={onSubmit}
            >
                {({isSubmitting, values}) => (
                    <Container>
                        <Card component={Paper}>
                            <CardContent>
                                <Grid component={Form} container spacing={4}>
                                    <Grid order={{xs: 0, md: 1, lg: 0}} item lg={3} md={12}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <List>
                                                    <ListItem>
                                                        <ListItemIcon sx={{color: 'black'}}>
                                                            <Place/>
                                                        </ListItemIcon>
                                                        <ListItemText primary='Starting point'/>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemIcon sx={{color: 'red'}}>
                                                            <Place/>
                                                        </ListItemIcon>
                                                        <ListItemText primary='Finishing point'/>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemIcon sx={{color: 'yellow'}}>
                                                            <Place/>
                                                        </ListItemIcon>
                                                        <ListItemText primary='Historical point'/>
                                                    </ListItem>
                                                </List>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Grid container spacing={3}>
                                                    <CoordEntryForm
                                                        title='Starting Point'
                                                        name='start'
                                                        size='small'
                                                    />

                                                    <CoordEntryForm
                                                        title='End Point'
                                                        name='end'
                                                        size='small'
                                                    />

                                                    <Grid item xs={12}>
                                                        <Box width='100%' height='100px'>
                                                            <FileForm
                                                                accept={{'image/*': []}}
                                                                maxFiles={1}
                                                                name='picture'
                                                            />
                                                        </Box>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FieldLabel htmlFor='title'>Title</FieldLabel>
                                                        <AppTextField
                                                            autoComplete='off'
                                                            placeholder='My race title'
                                                            name='title'
                                                            size='small'
                                                            id='title'
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <FieldLabel htmlFor='description'>Description</FieldLabel>
                                                        <AppTextField
                                                            autoComplete='off'
                                                            placeholder='Write something here...'
                                                            name='description'
                                                            size='small'
                                                            id='description'
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <Box display='flex' justifyContent='center'>
                                                            <ActionButton disabled={isSubmitting} type='submit'
                                                                          variant='contained'>
                                                                {isSubmitting ? (
                                                                    <CircularProgress/>
                                                                ) : (
                                                                    'Save'
                                                                )}
                                                            </ActionButton>
                                                        </Box>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid order={{xs: 1, md: 0, lg: 1}} item lg={9} md={12} minHeight='70vh'>
                                        <RouteMapForm/>
                                    </Grid>

                                    <Grid order={2} item xs={12}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box display='flex' alignItems='center' borderBottom='3px solid #d4e0f1'
                                                     position='relative' justifyContent='flex-start'>
                                                    <HistoricalEventsTitle
                                                        sx={{cursor: 'pointer'}}>Historical</HistoricalEventsTitle>
                                                    <OrangeBorder/>
                                                    <Box sx={{ml: 'auto'}} onClick={scrollToHistoricalEvents}>
                                                        <Button
                                                            sx={{
                                                                color: '#0E5753',
                                                                borderColor: '#0E5753'
                                                            }}
                                                            variant='outlined'
                                                        >
                                                            🔺 Scroll to Events
                                                        </Button>
                                                    </Box>
                                                    <Box sx={{ml: '20px'}} onClick={scrollToHistoricalForm}>
                                                        <Button
                                                            sx={{
                                                                color: '#0E5753',
                                                                borderColor: '#0E5753'
                                                            }}
                                                            variant='outlined'
                                                        >
                                                            🔻 Scroll to Form
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FieldArray
                                                    name='historicalEvents'
                                                    render={(arrayHelpers) => (
                                                        <Box>
                                                            {values.historicalEvents.map((event, index) => (
                                                                <RouteHistoricalForm
                                                                    key={index}
                                                                    name={`historicalEvents.${index}`}
                                                                />
                                                            ))}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Container>
                )}
            </Formik>
        </>
    );
}
