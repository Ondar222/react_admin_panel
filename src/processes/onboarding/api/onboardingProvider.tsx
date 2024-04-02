import { Hotel, useHotel } from "@/entities/hotel";
import { Room, useRoom } from "@/entities/room";
import { useLoading, withLoading } from "@/processes";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OnboardingContextProps {
    onboardingStatus: "wait" | "process" | "finish" | "error",
    setOnboardingStatus: React.Dispatch<React.SetStateAction<"wait" | "process" | "finish" | "error">>,
    currentStep: OnboardingSteps,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    currentStepProgress: [number, number],
    setCurrentStepProgress: React.Dispatch<React.SetStateAction<[number, number]>>
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
    setCurrentStepProgress: undefined
})

const OnboardingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [onboardingStatus, setOnboardingStatus] = useState<"wait" | "process" | "finish" | "error">()
    const [currentStep, setCurrentStep] = useState<OnboardingSteps>(OnboardingSteps.HotelUpdate)
    const [currentStepProgress, setCurrentStepProgress] = useState<[number, number]>([0, 0])
    const navigate = useNavigate()

    const { hotel, getHotelDetails } = useHotel()
    const { rooms, getHotelRelatedRooms } = useRoom()
    const { setLoading } = useLoading()

    const fetchData = async () => {
        await getHotelDetails()
        await getHotelRelatedRooms()
    }

    useEffect(() => {
        withLoading(fetchData, setLoading)
    }, [])

    useEffect(() => {
        console.group("api data")
        console.log(hotel)
        console.log(rooms)
        console.groupEnd()
    }, [])

    useEffect(() => {
        checkOnboardingStatus(
            setOnboardingStatus,
            setCurrentStep,
            setCurrentStepProgress,
            hotel,
            rooms,
        ).then((res) => {
            if (onboardingStatus === "finish")
                navigate("/hotel")
        })
    }, [])

    return (
        <OnboardingContext.Provider
            value={{
                onboardingStatus,
                setOnboardingStatus,
                currentStep,
                setCurrentStep,
                currentStepProgress,
                setCurrentStepProgress
            }}>
            {children}
        </OnboardingContext.Provider>
    )
}

const useOnboarding = () => {
    const context = useContext(OnboardingContext)
    return context
}

const checkOnboardingStatus = async (
    setOnboardingStatus: React.Dispatch<React.SetStateAction<"wait" | "process" | "finish" | "error">>,
    setCurrentStep: (step: OnboardingSteps) => void,
    setCurrentStepProgress: React.Dispatch<React.SetStateAction<[number, number]>>,
    hotel: Hotel | undefined,
    rooms: Room[] | undefined,
): Promise<void> => {
    console.log(!hotel?.id)
    if (!hotel?.id) {
        setOnboardingStatus("process");
        setCurrentStep(OnboardingSteps.HotelUpdate);
        setCurrentStepProgress([1, 1]);
        console.log("hotel update step");
        return
    }
    console.log(rooms)
    console.log(!rooms || rooms?.length === 0)
    if (!rooms || rooms?.length === 0) {
        setOnboardingStatus("process");
        setCurrentStep(OnboardingSteps.RoomCreation);
        setCurrentStepProgress([1, 1]);
        console.log("room create step");
        return
    }


    setOnboardingStatus("finish");
    setCurrentStep(OnboardingSteps.CompleteOnboarding);
    setCurrentStepProgress([1, 1]);
    console.log("onboarding finished");
};

export { OnboardingProvider, useOnboarding, checkOnboardingStatus }