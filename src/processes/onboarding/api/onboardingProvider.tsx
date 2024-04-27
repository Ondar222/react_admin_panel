import { useHotel } from "@/entities/hotel";
import { useRoom } from "@/entities/room";
import { useCookie } from "@/features";
import { message } from "antd";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OnboardingContextProps {
    onboardingStatus: "wait" | "process" | "finish" | "error",
    setOnboardingStatus: React.Dispatch<React.SetStateAction<"wait" | "process" | "finish" | "error">>,
    currentStep: OnboardingSteps,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    currentStepProgress: [number, number],
    setCurrentStepProgress: React.Dispatch<React.SetStateAction<[number, number]>>,
    checkOnboardingStatus: () => Promise<void>
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
    const { value, updateCookie } = useCookie("onboarding", "process")
    const [onboardingStatus, setOnboardingStatus] = useState<"wait" | "process" | "finish" | "error">(value as "wait" | "process" | "finish" | "error")
    const [currentStep, setCurrentStep] = useState<OnboardingSteps>(OnboardingSteps.HotelUpdate)
    const [currentStepProgress, setCurrentStepProgress] = useState<[number, number]>([0, 0])
    const navigate = useNavigate()
    const { hotel } = useHotel()
    const { rooms } = useRoom()

    const checkOnboardingStatus = async (): Promise<void> => {
        if (onboardingStatus === "finish") {
            setOnboardingStatus("finish");
            setCurrentStep(OnboardingSteps.CompleteOnboarding);
            setCurrentStepProgress([1, 1]);
            navigate("/booking")
            return
        }
        else {
            if (!hotel?.id) {
                setOnboardingStatus("process");
                setCurrentStep(OnboardingSteps.HotelUpdate);
                setCurrentStepProgress([1, 1]);
                navigate("/onboarding")
            }
            else if (!rooms || rooms?.length === 0) {
                setOnboardingStatus("process");
                setCurrentStep(OnboardingSteps.RoomCreation);
                setCurrentStepProgress([1, 1]);
                navigate("/onboarding")
            }
            else {
                setOnboardingStatus("finish");
                setCurrentStep(OnboardingSteps.CompleteOnboarding);
                setCurrentStepProgress([1, 1]);
                updateCookie("finish", { expires: 20000000000 })
                message.success('Онбординг завершен!')

                navigate("/booking")
            }
        }

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