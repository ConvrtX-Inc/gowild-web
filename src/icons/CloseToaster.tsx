import createSvgIcon from '@material-ui/core/utils/createSvgIcon';

const CloseToaster = createSvgIcon(
  <svg
    width='100%'
    height='100%'
    viewBox='-1 -5 12 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M9 1L1 9'
      stroke='white'
      strokeWidth='2'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M9 9L1 1'
      stroke='white'
      strokeWidth='2'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>,
  'CloseToaster'
);

export default CloseToaster;
