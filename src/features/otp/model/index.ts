type OtpCreationDto = {
    phone: string
}

interface UseOtp {
    statusCode: number,
    isLoading: boolean,
    error: Error | null,
    verifyPhoneNumber: (dto: OtpCreationDto) => Promise<void>
}

export type { UseOtp }