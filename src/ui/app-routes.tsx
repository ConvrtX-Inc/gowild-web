import {Navigate, RouteObject} from "react-router-dom";
import {AuthWrapper} from "./wrapper/auth.wrapper";
import {MainWrapper} from "./wrapper/main.wrapper";
import {AuthGuard} from "./guards/auth.guard";
import {GuestGuard} from "./guards/guest.guard";
import {WelcomeScreen} from "./screens/main/welcome.screen";
import {EditRouteScreen} from "./screens/routes/edit-route.screen";
import {RouteListScreen} from "./screens/routes/route-list.screen";
import {RouteListWrapper} from "./wrapper/route-list.wrapper";
import {CreateRouteScreen} from "./screens/routes/create-route.screen";
import {ViewRouteScreen} from "./screens/routes/view-route.screen";
import {GuidelinesScreen} from "./screens/guidelines/guidelines.screen";
import {TreasureChestWrapper} from "./wrapper/treasure-chest.wrapper";
import {TreasureChestListScreen} from "./screens/treasure-chests/treasure-chest-list.screen";
import {CreateTreasureChestScreen} from "./screens/treasure-chests/create-treasure-chest.screen";
import {EditTreasureChestScreen} from "./screens/treasure-chests/edit-treasure-chest.screen";
import {ViewTreasureChestScreen} from "./screens/treasure-chests/view-treasure-chest.screen";
import {LoginScreen} from "./screens/auth/login.screen";
import {PasswordRecoveryScreen} from "./screens/auth/password-recovery.screen";
import {PasswordResetScreen} from "./screens/auth/password-reset.screen";
import {RegisterScreen} from "./screens/auth/register.screen";
import {VerifyCodeScreen} from "./screens/auth/verify-code.screen";
import {GuidelinesWrapper} from "./wrapper/guidelines.wrapper";

export const appRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: (
            <AuthGuard>
                <MainWrapper/>
            </AuthGuard>
        ),
        children: [
            {
                path: "",
                element: <WelcomeScreen/>,
            },
            {
                path: "route-lists",
                element: <RouteListWrapper/>,
                children: [
                    {
                        path: '',
                        element: <RouteListScreen/>,
                    },
                    {
                        path: 'new',
                        element: <CreateRouteScreen/>
                    },
                    {
                        path: ':id',
                        element: <ViewRouteScreen/>
                    },
                    {
                        path: ':id/edit',
                        element: <EditRouteScreen/>
                    },
                ]
            },
            {
                path: 'guidelines',
                element: <GuidelinesWrapper/>,
                children: [
                    {
                        path: 'terms-and-conditions',
                        element: <GuidelinesScreen/>,
                    },
                    {
                        path: 'faqs',
                        element: <GuidelinesScreen/>,
                    },
                    {
                        path: 'e-waiver',
                        element: <GuidelinesScreen/>,
                    },
                ]
            },
            {
                path: 'treasure-chests',
                element: <TreasureChestWrapper/>,
                children: [
                    {
                        path: '',
                        element: <TreasureChestListScreen/>
                    },
                    {
                        path: 'new',
                        element: <CreateTreasureChestScreen/>
                    },
                    {
                        path: ':id',
                        element: <ViewTreasureChestScreen/>
                    },
                    {
                        path: ':id/edit',
                        element: <EditTreasureChestScreen/>
                    }
                ]
            }
        ],
    },
    {
        path: "authentication",
        element: (
            <GuestGuard>
                <AuthWrapper/>
            </GuestGuard>
        ),
        children: [
            {
                path: "login",
                element: <LoginScreen/>,
            },
            {
                path: "password-recovery",
                element: <PasswordRecoveryScreen/>,
            },
            {
                path: "password-reset",
                element: <PasswordResetScreen/>,
            },
            {
                path: "register",
                element: <RegisterScreen/>,
            },
            {
                path: "verify-code",
                element: <VerifyCodeScreen/>,
            },
            {
                path: "",
                element: <Navigate to='/authentication/login' replace/>,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to='/dashboard' replace/>,
    },
];
