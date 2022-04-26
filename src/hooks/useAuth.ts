import { useContext } from "react";
// import AuthContext from "../contexts/JWTContext";
import AuthContext from "../contexts/AxiosContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
