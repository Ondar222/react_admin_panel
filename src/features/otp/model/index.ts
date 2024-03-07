interface OtpDto {
    phone: string
}

// создадим еще один хук

interface UseOtp {
    verifyPhoneNumber: (dto: OtpDto) => Promise<void> // функция буде асинхронная, поэтому нужно оборачивать в Promise
}

export type { OtpDto, UseOtp }