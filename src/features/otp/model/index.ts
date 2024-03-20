type OtpCreationDto = {
    phone: string
}

interface UseOtp {
    verifyPhoneNumber: (dto: OtpCreationDto) => Promise<void>
}

export type { UseOtp }