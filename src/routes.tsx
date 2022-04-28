import { Suspense, lazy } from "react";
import type { PartialRouteObject } from "react-router";
// import { Navigate } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import GuestGuard from "./components/GuestGuard";
import LoadingScreen from "./components/LoadingScreen";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// Authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const PasswordRecovery = Loadable(
  lazy(() => import("./pages/authentication/PasswordRecovery"))
);
const PasswordReset = Loadable(
  lazy(() => import("./pages/authentication/PasswordReset"))
);
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const VerifyCode = Loadable(
  lazy(() => import("./pages/authentication/VerifyCode"))
);

// Dashboard pages
const Overview = Loadable(lazy(() => import("./pages/dashboard/Overview")));
const RouteList = Loadable(lazy(() => import("./pages/dashboard/RouteList")));

const RouteListCreate = Loadable(
  lazy(() => import("./pages/dashboard/RouteListCreate"))
);

const Guidelines = Loadable(lazy(() => import("./pages/dashboard/Guidelines")));

// const Chat = Loadable(lazy(() => import("./pages/dashboard/Chat")));

// Error pages
const AuthorizationRequired = Loadable(
  lazy(() => import("./pages/AuthorizationRequired"))
);
const NotFound = Loadable(lazy(() => import("./pages/NotFound")));
const ServerError = Loadable(lazy(() => import("./pages/ServerError")));

// Other pages
// const Home = Loadable(lazy(() => import("./pages/Home")));

const routes: PartialRouteObject[] = [
  {
    path: "authentication",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <Login />
          </GuestGuard>
        ),
      },
      {
        path: "login-unguarded",
        element: <Login />,
      },
      {
        path: "password-recovery",
        element: <PasswordRecovery />,
      },
      {
        path: "password-reset",
        element: <PasswordReset />,
      },
      {
        path: "register",
        element: (
          <GuestGuard>
            <Register />
          </GuestGuard>
        ),
      },
      {
        path: "register-unguarded",
        element: <Register />,
      },
      {
        path: "verify-code",
        element: <VerifyCode />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      // {
      //   path: "/route-list",
      //   element: <RouteList />,
      // },
      {
        path: "route-list",
        children: [
          {
            path: "/",
            element: <RouteList />,
          },
          {
            path: "new",
            element: <RouteListCreate />,
          },
        ],
      },
      {
        path: "/guidelines",
        element: <Guidelines />,
      },
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
    ],
  },

  // ----WILD CARD (DEFAULT MAIN ROUTES) localhost:3000 or main endpt----
  {
    path: "*",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        // element: <Home />,
        element: <Overview />,
      },
      {
        path: "401",
        element: <AuthorizationRequired />,
      },
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "500",
        element: <ServerError />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
