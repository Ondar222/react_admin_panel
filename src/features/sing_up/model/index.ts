import { UseOtp } from "@/features/otp"
import { InputProps } from "antd"

interface SignUpDto {
    email: string
    phone: string
    password: string

    surname: string
    name: string

    code: string
}

interface UseSignUp {
    signUp: (dto: SignUpDto) => Promise<void>
}

interface SignUpFormUIProps {
    user: SignUpDto
    onChange: InputProps["onChange"]
    verifyPhoneNumber: UseOtp["verifyPhoneNumber"]
    signUp: UseSignUp["signUp"]
}

export type { UseSignUp, SignUpDto, SignUpFormUIProps }
