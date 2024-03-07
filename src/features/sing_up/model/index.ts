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

export type { UseSignUp, SignUpDto }
