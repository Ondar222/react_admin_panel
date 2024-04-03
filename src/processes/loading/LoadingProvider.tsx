import { WithChildren } from "@/types/WithChildren";
import { Spin } from "antd";
import { FC, createContext, useContext, useState } from "react";

type LoadingContextProps = {
    loading: boolean
    setLoading: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

const LoadingContext = createContext<LoadingContextProps>({ loading: false, setLoading: undefined })

const LoadingProvider: FC<WithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
}

const LoadingWrapper: FC<WithChildren> = ({ children }) => {
    const { loading } = useLoading();

    return (
        <>
            {loading && <Spin fullscreen />}
            {children}
        </>
    )
};

const useLoading = () => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

const withLoading = async (
    callback: () => void,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setLoading(true);
    try {
        const result = await callback();
        return result;
    } catch (error) {
        throw error;
    } finally {
        setLoading(false);
    }
};

export { LoadingProvider, LoadingWrapper, useLoading, withLoading }
