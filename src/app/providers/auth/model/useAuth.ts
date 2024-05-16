import { AxiosError } from "axios"

type AuthContextProps = {
    isAuth: boolean
    error: Error | AxiosError | undefined
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

interface UseAuth {

}

export type { AuthContextProps, UseAuth }