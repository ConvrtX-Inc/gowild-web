import { useAppSelector } from 'src/lib/store';

export function useAuth() {
  const { token, decoded } = useAppSelector((state) => state.auth);
  return { token, isAuthenticated: !!token, user: decoded?.user, sub: decoded?.sub };
}
