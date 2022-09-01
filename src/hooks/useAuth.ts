// import AuthContext from "../contexts/JWTContext";
import AuthContext from '../contexts/AxiosContext';
import { useContext } from 'react';

const useAuth = () => useContext(AuthContext);

export default useAuth;
