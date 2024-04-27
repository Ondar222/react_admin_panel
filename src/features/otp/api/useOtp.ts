import { create } from "zustand";
import { UseOtp } from "../model";
import axios from "axios";
import { isPhoneNumber } from "class-validator";
import { ApiResponse } from "@/app/types";

const useOtp = create<UseOtp>((set, get) => ({
    statusCode: 200,
    error: null,
    isLoading: false,

    async verifyPhoneNumber(dto) {
        set({ isLoading: true })
        try {
            if (!isPhoneNumber(dto.phone, "RU")) {
                
                setTimeout(() => {
                    set({
                        isLoading: false
                    })
                }, 200)

                throw new Error("invalid phone number")
            }
        }
        catch (e) {
            set({ error: new Error("invalid phone number") })
            throw new Error("invalid phone number")
        }


        const isValid = await axios.post<ApiResponse<number>>(`${import.meta.env.VITE_API}/otp`, dto)
            .then((res) => res.status)

        set({
            isLoading: false,
            statusCode: isValid
        })

    }
}))

export { useOtp }