import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import type { ScrollBarProps as PerfectScrollbarProps } from 'react-perfect-scrollbar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

type ScrollbarProps = PerfectScrollbarProps;

const Scrollbar = forwardRef<HTMLDivElement, ScrollbarProps>((props, ref) => {
  const { children, ...other } = props;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box ref={ref} sx={{ overflowX: 'auto' }}>
        {children}
      </Box>
    );
  }

  return (
    <PerfectScrollbar ref={ref as any} {...other}>
      {children}
    </PerfectScrollbar>
  );
});

Scrollbar.displayName = 'Scrollbar';

Scrollbar.propTypes = {
  children: PropTypes.node
};

export default Scrollbar;
