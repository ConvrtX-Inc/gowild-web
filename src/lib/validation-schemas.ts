import * as Yup from "yup";

export const appPointValidationSchema = Yup.object().shape({
    type: Yup.string().oneOf(['Point']).required('This field is required'),
    coordinates: Yup.array(Yup.number()).required('This field is required'),
});

export const pictureValidationSchema = Yup.object().shape({
    id: Yup.string().required('This field is required'),
});

export const historicalEventsValidationSchema = Yup.object().shape({
    id: Yup.string().nullable(),
    createdDate: Yup.string().nullable(),
    updatedDate: Yup.string().nullable(),
    route: Yup.mixed().nullable(),
    closureUid: Yup.string().nullable(),
    point: appPointValidationSchema.required('This field is required'),
    title: Yup.string().max(255).required('This field is required'),
    subtitle: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
    picture: pictureValidationSchema.nullable(),
    medias: Yup.array(pictureValidationSchema).nullable(),
});

export const routeValidationSchema = Yup.object().shape({
    id: Yup.string().nullable(),
    createdDate: Yup.string().nullable(),
    updatedDate: Yup.string().nullable(),
    user: Yup.mixed().required(),
    title: Yup.string().max(80).required('This field is required'),
    start: appPointValidationSchema,
    end: appPointValidationSchema,
    historicalEvents: Yup.array(historicalEventsValidationSchema).nullable(),
    picture: pictureValidationSchema.nullable(),
    description: Yup.string().max(255).required('This field is required'),
});
