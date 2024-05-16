import { FC, ReactNode, createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCredentails } from '../../../features/auth/api/index'
import { ApiResponse } from '@/app/types';
import axios, { AxiosError } from 'axios';
import { IAuthResponse } from '../../../features/auth/model/interface';
import { notification } from 'antd';
import { AuthContextProps } from './model/useAuth';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const isAuthLocalStorage: boolean = Boolean(localStorage.getItem('isAuth'))
    const [isAuth, setIsAuth] = useState<boolean>(isAuthLocalStorage)
    const [error, setError] = useState<AxiosError | Error | undefined>(undefined)
    const navigate = useNavigate();
    const { setCredentials, removeCredentials } = useCredentails()

    const login = async (email: string, password: string) => {
        const data = {
            email,
            password,
        };

        await axios
            .post<ApiResponse<IAuthResponse>>(
                `${import.meta.env.VITE_API}/auth/login/password`,
                data
            ).then((res) => {
                setCredentials(res.data.data);
                setIsAuth(true)
                navigate('/booking')
            }).catch((e) => {
                notification.error({
                    message: "Не удалось войти",
                    placement: "topRight"
                })
                setError(e)
                throw e
            });
    }

    const refreshTokens = async (refresh_token: string) => {
        await axios
            .post<ApiResponse<IAuthResponse>>(
                `${import.meta.env.VITE_API}/auth/refresh`,
                {
                    refresh: refresh_token
                },
            )
            .then((res) => {
                setCredentials(res.data.data);
                setIsAuth(true)
            })
            .catch((e) => {
                notification.error({
                    message: "Не смогли обновить вход, войдите используя логин и пароль",
                    placement: "topRight",
                })
                navigate('auth')
                throw e
            });
    }

    const logout = () => {
        removeCredentials()
        setIsAuth(false)
    }

    const checkIsAuth = async () => {
        const isAuthRecord = localStorage.getItem("isAuth")
        const accessTokenRecord = localStorage.getItem("access_token");
        const refreshTokenRecord = localStorage.getItem("refresh_token");

        if (accessTokenRecord && refreshTokenRecord && isAuthRecord === "true") {
            setIsAuth(true)
        } else if (refreshTokenRecord && !isAuthRecord) {
            refreshTokens(refreshTokenRecord)
            navigate('/auth')
        }
        else {
            setIsAuth(false)
        }
    }

    useEffect(() => {
        checkIsAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ isAuth, error, login, logout, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext)
}