import {styled, Typography} from "@mui/material";

export const ContentTitleTypography = styled(Typography)(({theme}) => ({
    fontFamily: 'Samsung Sharp Sans Bold',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 4,
    color: 'white',
    [theme.breakpoints.up('md')]: {
        fontSize: 48,
        lineHeight: 3,
    }
}));


export const SubTitleTypography = styled(Typography)(({theme}) => ({
    fontFamily: 'Circular Std Bold',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 4,
    letterSpacing: '-0.04em',
    [theme.breakpoints.up('md')]: {
        fontSize: 32,
        lineHeight: 3,
    }
}));
