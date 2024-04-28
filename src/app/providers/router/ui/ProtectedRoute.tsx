import { useAuth } from "@/features/auth";
import { useOnboarding } from "@/processes/onboarding/api/onboardingProvider";
import { OnboardingStatus } from "@/processes/onboarding/model";
import { WithChildren } from "@/types/WithChildren";
import { FC } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps extends WithChildren {
    authCheck?: boolean
    onboardCheck?: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, onboardCheck = true, authCheck = true }) => {
    const { isAuth } = useAuth()
    const { onboardingStatus } = useOnboarding()

    if (authCheck === true && !isAuth) {
        return <Navigate to="/auth" replace />;
    }

    if (onboardCheck === true && onboardingStatus != OnboardingStatus.FINISH) {
        return <Navigate to="/onboarding" replace />;
    }

    return children;
};

export { ProtectedRoute }