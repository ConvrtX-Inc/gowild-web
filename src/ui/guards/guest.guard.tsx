import { useAuth } from '../../lib/hooks/use-auth';
import { Navigate } from 'react-router-dom';

export interface GuestGuardProps {
  children: JSX.Element;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to='/main' replace /> : children;
}
