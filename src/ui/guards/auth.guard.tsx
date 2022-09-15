import { useAuth } from '../../lib/hooks/use-auth';
import { Navigate } from 'react-router-dom';

export interface AuthGuardProps {
  children: JSX.Element;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to='/authentication' replace />;
}
