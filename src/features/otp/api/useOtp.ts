import { create } from "zustand";
import { UseOtp } from "../model";
import axios from "axios";

const useOtp = create<UseOtp>((set, get) => ({
    async verifyPhoneNumber(dto) {
        await axios.post(`${import.meta.env.VITE_API}/otp`, dto)
            .then(res => console.log(res))

    }
}))

export { useOtp }