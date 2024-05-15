import { FC, ReactNode, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './index'

const AuthContext = createContext({
    isAuth: false,
    redirectToLogin: undefined
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { isAuth, checkAuth } = useAuth()

    const redirectToLogin = () => {
        if (!isAuth) {
            navigate('/auth')
        }
    };

    useEffect(() => {
        checkAuth()
        redirectToLogin()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuth, redirectToLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useRedirect = () => {
    return useContext(AuthContext)
}