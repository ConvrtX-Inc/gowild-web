import "dotenv/config";
import { createContext, useEffect, useReducer } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import type {} from // User,
// AxiosAdmin,
// InitiateAdmin,
"../types/user";
import axios from "axios";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  // user: User | null;
  // user: AxiosAdmin | null;
  user: any;
  // initiateUser: AxiosAdmin;
  initiateUser: any;
}

interface AuthContextValue extends State {
  platform: "Axios";
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: "INITIALIZE";
  payload: {
    isAuthenticated: boolean;
    // user: User | null;
    // user: Admin | null;
    // initiateUser: AxiosAdmin;
    initiateUser: any;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    // user: User;
    // user: AxiosAdmin;
    user: any;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type Action = InitializeAction | LoginAction | LogoutAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  initiateUser: null,
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, initiateUser } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      initiateUser,
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "Axios",
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const token = window.sessionStorage.getItem("token");
        console.log("INITIALIZED AUTHENTICATION");
        console.log("You must login to get a token");

        if (token) {
          const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/me`;
          const CONFIG = {
            headers: {
              Authorization: `bearer ${token}`,
            },
          };
          const apiResponse = await axios.get(URL, CONFIG);
          console.log(apiResponse);

          // initiateUser.push(apiResponse.data.user);
          console.log("INITIALIZE AUTH TOKEN TRIGGERED");

          const initiateUser = {
            address_line1: null,
            address_line2: null,
            created_date: "2022-04-19T16:32:36.206Z",
            deleted_date: null,
            email: "admin@convrtx.com",
            full_name: "Admin",
            id: "50764a56-6d09-4907-91dd-06a4abcdbabd",
            phone_no: null,
            profile_photo: "",
            updated_date: "2022-04-19T16:32:36.206Z",
            username: "admin",
            __entity: "User",
          };

          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: true,
              initiateUser,
            },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: {
              isAuthenticated: false,
              initiateUser: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: "INITIALIZE",
          payload: {
            isAuthenticated: false,
            initiateUser: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // const accessToken = await authApi.login({ email, password });
    // const user = await authApi.me(accessToken);
    console.log("LOG IN TRIGGERED");
    const user = [];
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`;
    const BODY = {
      email: email,
      password: password,
    };
    const CONFIG = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const apiResponse = await axios.post(URL, BODY, CONFIG);
    sessionStorage.setItem("token", apiResponse.data.token);
    user.push(apiResponse.data.user);

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem("token");
    sessionStorage.clear();
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Axios",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
