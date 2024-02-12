import { createContext } from "react";

// const checkAuth = useAuth((state) => state.checkAuth)

const AuthProvider = createContext({
    isAuth: false
})

export default AuthProvider