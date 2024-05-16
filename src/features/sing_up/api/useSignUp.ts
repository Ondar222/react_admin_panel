import { create } from "zustand";
import { UseSignUp } from "../model";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/app/types";
import { IAuthResponse } from "@/features/auth/model/interface";

const useSignUp = create<UseSignUp>((set) => ({
    signUp: async (dto) => {
        await axios
            .post<ApiResponse<IAuthResponse>>(
                `${import.meta.env.VITE_API}/user`, { ...dto, role: "hotel" }
            )
            .catch((error: AxiosError) => {
                throw error
            })
    }
}))

export { useSignUp }