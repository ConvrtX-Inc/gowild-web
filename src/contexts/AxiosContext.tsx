import type {} from // User,
// AxiosAdmin,
// InitiateAdmin,
'../types/user';
import axios from 'axios';
import 'dotenv/config';
import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import type { FC, ReactNode } from 'react';
import { getLogger } from 'src/utils/loggin';

const logger = getLogger('Axios Context');

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
  platform: 'Axios';
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
  payload: {
    isAuthenticated: boolean;
    // user: User | null;
    // user: Admin | null;
    // initiateUser: AxiosAdmin;
    initiateUser: any;
  };
};

type LoginAction = {
  type: 'LOGIN';
  payload: {
    // user: User;
    // user: AxiosAdmin;
    user: any;
  };
};

type LogoutAction = {
  type: 'LOGOUT';
};

type Action = InitializeAction | LoginAction | LogoutAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  initiateUser: null
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    const { isAuthenticated, initiateUser } = action.payload;

    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      initiateUser
    };
  },
  LOGIN: (state: State, action: LoginAction): State => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  LOGOUT: (state: State): State => ({
    ...state,
    isAuthenticated: false,
    user: null
  })
};

const reducer = (state: State, action: Action): State => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'Axios',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      try {
        const token = window.sessionStorage.getItem('token');
        const initiateUser = [];
        logger.debug('INITIALIZED AUTHENTICATION');
        logger.debug('You must login to get a token');

        if (token) {
          const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/me`;
          const CONFIG = {
            headers: {
              Authorization: `bearer ${token}`
            }
          };
          const apiResponse = await axios.get(URL, CONFIG);
          initiateUser.push(apiResponse.data.user);
          logger.debug('INITIALIZE-AUTH-TOKEN TRIGGERED');
          logger.debug('Login-thru-token Successfully');

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              initiateUser
            }
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              initiateUser: null
            }
          });
        }
      } catch (err) {
        logger.error(err);
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            initiateUser: null
          }
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    // const accessToken = await authApi.login({ email, password });
    // const user = await authApi.me(accessToken);
    logger.info('LOG IN TRIGGERED');
    const user = [];
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`;
    const BODY = {
      email,
      password
    };
    const CONFIG = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const apiResponse = await axios.post(URL, BODY, CONFIG);
    sessionStorage.setItem('token', apiResponse.data.token);
    sessionStorage.setItem('user_id', apiResponse.data.user.id);
    sessionStorage.setItem('user', apiResponse.data.user);
    user.push(apiResponse.data.user);

    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    });
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user');
    sessionStorage.clear();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Axios',
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
