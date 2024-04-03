import { create } from "zustand";
import { UseSignUp } from "../model";
import axios, { AxiosError } from "axios";
import { useCredentails } from "@/features/auth";
import { ApiResponse } from "@/app/types";
import { IAuthResponse } from "@/features/auth/model/interface";

const useSignUp = create<UseSignUp>((set) => ({
    async signUp(dto) {
        const credentials = await axios
            .post<ApiResponse<IAuthResponse>>(
                `${import.meta.env.VITE_API}/user`, { ...dto, role: "hotel" }
            )
            .then((res) => {
                console.log(res)
                return res.data.data
            })
            .catch((error: AxiosError) => {
                throw error
            })

        useCredentails.getState().setCredentails({
            access_token: credentials.access_token,
            refresh_token: credentials.refresh_token,
            expires: credentials.expires
        })
    }
}))

export { useSignUp }