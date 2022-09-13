import {Button, ButtonProps, IconButton, IconButtonProps, styled} from "@mui/material";
import React from "react";

export type AppButtonProps<T = any> = Partial<T> & ButtonProps & {
    component?: React.JSXElementConstructor<T>;
}

export const ActionButton = styled(Button)<AppButtonProps>(() => ({
    backgroundImage: "url('/static/btn/save-btn.png')",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundColor: '#00755e',
    borderRadius: 12,
    fontFamily: 'Gilroy Bold',
    paddingX: 24,
    paddingY: 'auto',
    fontSize: '1rem',
    lineHeight: 3,
    textAlign: 'center',
    color: 'white',
    width: '100%'
}));

export const TitleIconButton = styled(IconButton)<IconButtonProps>(({theme}) => ({
    backgroundColor: 'white',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
}));

