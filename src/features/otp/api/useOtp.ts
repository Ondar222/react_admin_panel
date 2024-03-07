import { create } from "zustand";
import { UseOtp } from "../model";
import axios from "axios";

const useOtp = create<UseOtp>((set, get) => ({
    async verifyPhoneNumber(dto) {
        // раньше я тебя учил работать через fetch, но проект большой поэтому лучше axios
        // эта функция отправляет запрос на сервер, чтобы он отправил тебе смс код на телефон
        await axios.post(`${import.meta.env.VITE_API}/otp`, dto)
            .then(res => console.log(res)) // это не обязательно, просто хочу посмотреть что вернется

    }
}))

export { useOtp }