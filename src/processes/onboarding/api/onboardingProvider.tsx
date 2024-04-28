import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useHotel, useRoom } from "@/entities";
import { useCookie } from "@/features";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { OnboardingContextProps, OnboardingStatus, OnboardingSteps } from "../model";

const OnboardingContext = createContext<OnboardingContextProps>({
    onboardingStatus: OnboardingStatus.PROCESS,
    setOnboardingStatus: undefined,
    currentStep: OnboardingSteps.HotelUpdate,
    setCurrentStep: undefined,
    currentStepProgress: [0, 0],
    setCurrentStepProgress: undefined,
    checkOnboardingStatus: undefined,
    skipOnboarding: undefined
})

const OnboardingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { cookieValue, updateCookie } = useCookie("onboarding", "process")
    const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus>(cookieValue as OnboardingStatus)
    const [currentStep, setCurrentStep] = useState<OnboardingSteps>(OnboardingSteps.HotelUpdate)
    const [currentStepProgress, setCurrentStepProgress] = useState<[number, number]>([0, 0])
    const navigate = useNavigate()
    const { hotel } = useHotel()
    const { rooms } = useRoom()

    const checkOnboardingStatus = (): void => {
        if (onboardingStatus === "finish") {
            completeOnboarding()
            return
        }
        else {
            if (!hotel?.id) {
                setOnboardingStatus(OnboardingStatus.PROCESS);
                setCurrentStep(OnboardingSteps.HotelUpdate);
                setCurrentStepProgress([1, 3]);
                navigate("/onboarding")
                return
            }
            else if (!rooms || rooms?.length === 0) {
                setOnboardingStatus(OnboardingStatus.PROCESS);
                setCurrentStep(OnboardingSteps.RoomCreation);
                setCurrentStepProgress([2, 3]);
                updateCookie("process", { expires: 20000000000 })
                navigate("/onboarding")
                return
            }
            else {
                completeOnboarding()
            }
        }
    };

    const completeOnboarding = () => {
        setOnboardingStatus(OnboardingStatus.FINISH);
        setCurrentStep(OnboardingSteps.CompleteOnboarding);
        setCurrentStepProgress([3, 3]);
        updateCookie("finish", { expires: 20000000000 })
        message.success('Онбординг завершен!')
        navigate("/booking")
    }

    const skipOnboarding = (): void => {
        setOnboardingStatus(OnboardingStatus.FINISH);
        setCurrentStep(OnboardingSteps.CompleteOnboarding);
        setCurrentStepProgress([3, 3]);
        updateCookie("finish", { expires: 20000000000 })
        navigate("/booking")
        return
    }

    return (
        <OnboardingContext.Provider
            value={{
                onboardingStatus,
                setOnboardingStatus,
                currentStep,
                setCurrentStep,
                currentStepProgress,
                setCurrentStepProgress,
                checkOnboardingStatus,
                skipOnboarding
            }}>
            {children}
        </OnboardingContext.Provider>
    )
}

const useOnboarding = () => {
    const context = useContext(OnboardingContext)
    return context
}

export { OnboardingProvider, useOnboarding }