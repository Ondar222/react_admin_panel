interface UseOnboarding {
    onboardingStatus: boolean,
    setOnboargingStatus: (status: boolean) => void
    isFirstRoomCreated: boolean,
    isHotelDataChecked: boolean,

    checkOnboardingStatus: () => Promise<void>
}

export type { UseOnboarding }