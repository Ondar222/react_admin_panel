import { FC, ReactNode, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './index'

// Создаем контекст для хранения информации об авторизации
const AuthContext = createContext({
    isAuth: false,
    redirectToLogin: undefined
});

// Создаем провайдер для передачи информации об авторизации
export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const { isAuth, checkAuth } = useAuth()

    // Функция для редиректа на страницу входа
    const redirectToLogin = () => {
        if (!isAuth) {
            navigate('/auth')
        }
    };

    useEffect(() => {
        checkAuth()
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