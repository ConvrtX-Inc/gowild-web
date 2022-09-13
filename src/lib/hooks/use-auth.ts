import {useAppSelector} from "../store";

export function useAuth() {
    const {token, decoded} = useAppSelector((state) => state.auth);
    return {token, isAuthenticated: !!token, user: decoded?.user, sub: decoded?.sub};
}
