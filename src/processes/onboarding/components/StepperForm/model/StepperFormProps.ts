import { ReactNode } from "react"

interface useStepperFormI {
    currentStep: number

    setCurrentStep: (step: number) => void
    setNextStep: () => void
    setPreviousStep: () => void
}


interface StepperFormProps {
    isCompleted: boolean

    step: number
    next: () => void
    prev: () => void
}

type StepTitle = {
    title: ReactNode
}

type StepperFormStepProps = {
    title: ReactNode
    content: ReactNode
}

export type {useStepperFormI, StepperFormProps, StepperFormStepProps}