// import { Navigate } from "react-router-dom";
import AuthGuard from './ui/components/AuthGuard';
import GuestGuard from './ui/components/GuestGuard';
import LoadingScreen from './ui/components/LoadingScreen';
import DashboardLayout from './ui/components/dashboard/DashboardLayout';
import { Suspense, lazy } from 'react';
import type { RouteObject } from 'react-router';

const Loadable = (Component) =>
  function loadable(props) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
  };

// Authentication pages
const Login = Loadable(lazy(() => import('./ui/pages/authentication/Login')));
const PasswordRecovery = Loadable(lazy(() => import('./ui/pages/authentication/PasswordRecovery')));
const PasswordReset = Loadable(lazy(() => import('./ui/pages/authentication/PasswordReset')));
const Register = Loadable(lazy(() => import('./ui/pages/authentication/Register')));
const VerifyCode = Loadable(lazy(() => import('./ui/pages/authentication/VerifyCode')));

// Dashboard pages
const Overview = Loadable(lazy(() => import('./ui/pages/dashboard/Overview')));
const RouteList = Loadable(lazy(() => import('./ui/pages/dashboard/RouteList')));

const RouteListCreate = Loadable(lazy(() => import('./ui/pages/dashboard/RouteListCreate')));
const RouteListEdit = Loadable(lazy(() => import('./ui/pages/dashboard/RouteListEdit')));
const RouteListView = Loadable(lazy(() => import('./ui/pages/dashboard/RouteListView')));

const Guidelines = Loadable(lazy(() => import('./ui/pages/dashboard/Guidelines')));

const TreasureChestList = Loadable(lazy(() => import('./ui/pages/dashboard/TreasureChestList')));
const CreateTreasureChest = Loadable(
  lazy(() => import('./ui/pages/dashboard/TreasureChestCreate'))
);

const ViewTreasureChest = Loadable(lazy(() => import('./ui/pages/dashboard/TreasureChestView')));

const EditTreasureChest = Loadable(lazy(() => import('./ui/pages/dashboard/TreasureChestEdit')));

// const Chat = Loadable(lazy(() => import("./pages/dashboard/Chat")));

// Error pages
const AuthorizationRequired = Loadable(lazy(() => import('./ui/pages/AuthorizationRequired')));
const NotFound = Loadable(lazy(() => import('./ui/pages/NotFound')));
const ServerError = Loadable(lazy(() => import('./ui/pages/ServerError')));

// Other pages
// const Home = Loadable(lazy(() => import("./pages/Home")));

export const appRoutes: RouteObject[] = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        )
      },
      {
        path: 'login-unguarded',
        element: <Login />
      },
      {
        path: 'password-recovery',
        element: <PasswordRecovery />
      },
      {
        path: 'password-reset',
        element: <PasswordReset />
      },
      {
        path: 'register',
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        )
      },
      {
        path: 'register-unguarded',
        element: <Register />
      },
      {
        path: 'verify-code',
        element: <VerifyCode />
      }
    ]
  },
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        element: <Overview />
      },
      // {
      //   path: "/route-list",
      //   element: <RouteList />,
      // },
      {
        path: 'route-list',
        children: [
          {
            path: '',
            element: <RouteList />
          },
          {
            path: 'new',
            element: <RouteListCreate />
          },
          {
            path: 'edit',
            element: <RouteListEdit />
          },
          {
            path: 'view',
            element: <RouteListView />
          }
        ]
      },
      {
        path: 'guidelines',
        element: <Guidelines />
      },
      {
        path: 'treasure-chest-list',
        children: [
          {
            path: '',
            element: <TreasureChestList />
          },
          {
            path: 'new',
            element: <CreateTreasureChest />
          },
          {
            path: 'view/:id',
            element: <ViewTreasureChest />
          },
          {
            path: 'edit/:id',
            element: <EditTreasureChest />
          }
        ]
      }
      // {
      //   path: "chat",
      //   children: [
      //     {
      //       path: "/",
      //       element: <Chat />,
      //     },
      //     {
      //       path: "new",
      //       element: <Chat />,
      //     },
      //     {
      //       path: ":threadKey",
      //       element: <Chat />,
      //     },
      //   ],
      // },
    ]
  },

  // ----WILD CARD (DEFAULT MAIN ROUTES) localhost:3000 or main endpt----
  {
    path: '*',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: '',
        // element: <Home />,
        element: <Overview />
      },
      {
        path: '401',
        element: <AuthorizationRequired />
      },
      {
        path: '404',
        element: <NotFound />
      },
      {
        path: '500',
        element: <ServerError />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];
