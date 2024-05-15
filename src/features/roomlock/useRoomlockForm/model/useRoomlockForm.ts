interface useRoomlockFormStore {
    isRoomlockCreationFormOpen: boolean
    dates: [number, number],
    setIsRoomlockCreationFormOpen: (state: boolean) => void,
    setDates: (dates: [number, number]) => void
}

export type { useRoomlockFormStore }