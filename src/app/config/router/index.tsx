import { RouteProps } from "react-router-dom"
import {
    AccountPage,
    HotelPage,
    SignUpPage,
    SignInPage,
    BookingPage,
    BookingDetailPage,
    RoomPage,
    RoomDetailsPage,
    RoomCreationPage,
    RoomlockDetailsPage,
    FirstStart,
    NotFoundPage,
    TermsPage
} from "@/pages";
import { ProtectedRoute } from "@/app/providers/router/ui/ProtectedRoute";
import { PasswordResetLinkPage } from "@/pages/password_reset";
import { PasswordResetRequestPage } from "@/pages/password_reset/PasswordResetRequest";

enum AppRoutes {
    MAIN = "main",

    SIGN_IN = "sign_in",
    SIGN_UP = "sign_up",

    BOOKING = "booking",
    BOOKING_DETAILS = "booking_details",

    HOTEL = "hotel",

    ROOM = "room",
    ROOM_DETAILS = "room_details",
    ROOM_CREATE = "room_create",

    ACCOUNT = "account",

    ROOMLOCK_DETAILS = "roomlock_details",
    ONBOARDING = "onboarding",
    PASSWORD_RESET = "password_reset",
    PASSWORD_RESET_LINK = "password_reset_link",
    NOT_FOUND = "not_found",

    TERMS = "terms"
}

const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.SIGN_IN]: "/auth",
    [AppRoutes.SIGN_UP]: "/",
    [AppRoutes.BOOKING]: "/booking",
    [AppRoutes.BOOKING_DETAILS]: "/booking/:id",
    [AppRoutes.HOTEL]: "/hotel",
    [AppRoutes.ROOM]: "/room",
    [AppRoutes.ROOM_DETAILS]: "/room/:id",
    [AppRoutes.ROOM_CREATE]: "/room/+",
    [AppRoutes.ACCOUNT]: "/account",
    [AppRoutes.ROOMLOCK_DETAILS]: "/roomlock/:id",
    [AppRoutes.ONBOARDING]: "/onboarding",
    [AppRoutes.TERMS]: "/terms",
    [AppRoutes.PASSWORD_RESET]: "/password/reset",
    [AppRoutes.PASSWORD_RESET_LINK]: '/password/reset/:id',
    [AppRoutes.NOT_FOUND]: "*"
}

const RouterConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <SignUpPage />,
    },
    [AppRoutes.SIGN_IN]: {
        path: RoutePath.sign_in,
        element: <SignInPage />
    },
    [AppRoutes.SIGN_UP]: {
        path: RoutePath.sign_up,
        element: <SignUpPage />
    },
    [AppRoutes.BOOKING]: {
        path: RoutePath.booking,
        element: (
            <ProtectedRoute>
                <BookingPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.BOOKING_DETAILS]: {
        path: RoutePath.booking_details,
        element: (
            <ProtectedRoute>
                <BookingDetailPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.HOTEL]: {
        path: RoutePath.hotel,
        element: (
            <ProtectedRoute onboardCheck={false}>
                <HotelPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.ROOM]: {
        path: RoutePath.room,
        element: (
            <ProtectedRoute>
                <RoomPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.ROOM_DETAILS]: {
        path: RoutePath.room_details,
        element: (
            <ProtectedRoute>
                <RoomDetailsPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.ROOM_CREATE]: {
        path: RoutePath.room_create,
        element: (
            <ProtectedRoute>
                <RoomCreationPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.ACCOUNT]: {
        path: RoutePath.account,
        element: (
            <ProtectedRoute>
                <AccountPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.ROOMLOCK_DETAILS]: {
        path: RoutePath.roomlock_details,
        element: (
            <ProtectedRoute>
                <RoomlockDetailsPage />
            </ProtectedRoute>
        )
    },
    [AppRoutes.ONBOARDING]: {
        path: RoutePath.onboarding,
        element: (
            <ProtectedRoute onboardCheck={false}>
                <FirstStart />
            </ProtectedRoute>
        )
    },
    [AppRoutes.TERMS]: {
        path: RoutePath.terms,
        element: (
            <TermsPage />
        )
    },
    [AppRoutes.PASSWORD_RESET]: {
        path: RoutePath.password_reset,
        element: (
            <PasswordResetRequestPage />
        )
    },
    [AppRoutes.PASSWORD_RESET_LINK]: {
        path: RoutePath.password_reset_link,
        element: (
            <PasswordResetLinkPage />
        )
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    }
}

export { RouterConfig }