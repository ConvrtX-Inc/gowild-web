import type { Theme } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import type { SxProps } from '@material-ui/system';
import PropTypes from 'prop-types';
import type { FC, ReactNode } from 'react';

export type LabelColor = 'primary' | 'secondary' | 'error' | 'warning' | 'success';

interface LabelProps {
  children?: ReactNode;
  color?: LabelColor;
  sx?: SxProps<Theme>;
}

interface LabelRootProps {
  styleProps: {
    color: string;
  };
}

const LabelRoot = experimentalStyled('span')<LabelRootProps>(({ theme, styleProps }) => {
  const backgroundColor = theme.palette[styleProps.color].main;
  const color = theme.palette[styleProps.color].contrastText;

  return {
    alignItems: 'center',
    backgroundColor,
    borderRadius: theme.shape.borderRadius,
    color,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(11),
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingBottom: theme.spacing(0.5),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  };
});

const Label: FC<LabelProps> = (props) => {
  const { color = 'primary', children, ...other } = props;

  const styleProps = { color };

  return (
    <LabelRoot styleProps={styleProps} {...other}>
      {children}
    </LabelRoot>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'warning', 'success'])
};

export default Label;
