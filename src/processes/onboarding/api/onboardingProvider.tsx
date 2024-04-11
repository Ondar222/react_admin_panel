import { Hotel, useHotel } from "@/entities/hotel";
import { Room, useRoom } from "@/entities/room";
import useCookie from "@/features/cookie/api/useCookie";
import { useLoading, withLoading } from "@/processes";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OnboardingContextProps {
    onboardingStatus: "wait" | "process" | "finish" | "error",
    setOnboardingStatus: React.Dispatch<React.SetStateAction<"wait" | "process" | "finish" | "error">>,
    currentStep: OnboardingSteps,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    currentStepProgress: [number, number],
    setCurrentStepProgress: React.Dispatch<React.SetStateAction<[number, number]>>,
    checkOnboardingStatus: () => Promise<boolean>
}

enum OnboardingSteps {
    HotelUpdate,
    RoomCreation,
    CompleteOnboarding
}

const OnboardingContext = createContext<OnboardingContextProps>({
    onboardingStatus: "process",
    setOnboardingStatus: undefined,
    currentStep: OnboardingSteps.HotelUpdate,
    setCurrentStep: undefined,
    currentStepProgress: [0, 0],
    setCurrentStepProgress: undefined,
    checkOnboardingStatus: undefined
})

const OnboardingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { value } = useCookie("onboarding", "process")
    const [onboardingStatus, setOnboardingStatus] = useState<"wait" | "process" | "finish" | "error">(value as "wait" | "process" | "finish" | "error")
    const [currentStep, setCurrentStep] = useState<OnboardingSteps>(OnboardingSteps.HotelUpdate)
    const [currentStepProgress, setCurrentStepProgress] = useState<[number, number]>([0, 0])

    const { hotel } = useHotel()
    const { rooms } = useRoom()

    const checkOnboardingStatus = async (): Promise<boolean> => {
        if (!hotel?.id) {
            setOnboardingStatus("process");
            setCurrentStep(OnboardingSteps.HotelUpdate);
            setCurrentStepProgress([1, 1]);
            console.log("hotel update step");
            return false
        }

        if (!rooms || rooms?.length === 0) {
            setOnboardingStatus("process");
            setCurrentStep(OnboardingSteps.RoomCreation);
            setCurrentStepProgress([1, 1]);
            console.log("room create step");
            return false
        }

        setOnboardingStatus("finish");
        setCurrentStep(OnboardingSteps.CompleteOnboarding);
        setCurrentStepProgress([1, 1]);
        console.log("onboarding finished");
        return true
    };

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