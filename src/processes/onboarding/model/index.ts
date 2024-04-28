interface UseOnboarding {
    onboardingStatus: boolean,
    setOnboargingStatus: (status: boolean) => void
    isFirstRoomCreated: boolean,
    isHotelDataChecked: boolean,

    checkOnboardingStatus: () => void
    skipOnboarding: () => void
}

enum OnboardingStatus {
    WAIT = 'wait',
    PROCESS = 'process',
    FINISH = 'finish',
    ERROR = 'error'
}

interface OnboardingContextProps {
    onboardingStatus: OnboardingStatus,
    setOnboardingStatus: React.Dispatch<React.SetStateAction<OnboardingStatus>>,
    currentStep: OnboardingSteps,
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>,
    currentStepProgress: [number, number],
    setCurrentStepProgress: React.Dispatch<React.SetStateAction<[number, number]>>,
    checkOnboardingStatus: () => void,
    skipOnboarding: () => void
}

enum OnboardingSteps {
    HotelUpdate,
    RoomCreation,
    CompleteOnboarding
}

export type { UseOnboarding, OnboardingContextProps }
export { OnboardingStatus, OnboardingSteps }