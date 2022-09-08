import { useAuth } from '../../lib/hooks/use-auth';
import PropTypes from 'prop-types';
import type { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/dashboard/account' />;
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
