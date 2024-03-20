import { create } from "zustand";
import { UseOtp } from "../model";
import axios from "axios";
import { isPhoneNumber } from "class-validator";

const useOtp = create<UseOtp>((set, get) => ({
    async verifyPhoneNumber(dto) {
        if (!isPhoneNumber(dto.phone, "RU")) throw new Error("invalid phone number")

        await axios.post(`${import.meta.env.VITE_API}/otp`, dto)

    }
}))

export { useOtp }