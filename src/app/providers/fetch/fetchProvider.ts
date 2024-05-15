import { useCredentails } from "@/features/auth"
import axios, { AxiosRequestConfig } from "axios"

const fetchApi = async <T>(config: AxiosRequestConfig) => {
    const { access_token } = useCredentails()
    return await axios<T>({
        ...config,
        headers: {
            Authorization: `Bearer ${access_token}`,
            ...config.headers
        }
    })
}

export { fetchApi }