import { FC, ReactNode, useEffect, useState } from "react";
import { MainLayout } from "@/shared/layouts/layout";
import { Button, Steps, message } from "antd";
import { useHotel } from "@/entities/hotel";
import { useLoading, withLoading } from "@/processes";
import { useOnboarding } from "@/processes/onboarding/api/onboardingProvider";
import { HotelUpdateForm } from "@/widget/hotel/form/UpdateHotelForm";
import { AddNewRoomForm } from "@/widget";
import { Navigate, useNavigate } from "react-router-dom";
import useCookie from "@/features/cookie/api/useCookie";

const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 16,
};

const FirstStart: FC = () => {
    const [isOnboardingFinishable, setIsOnboardingFinishable] = useState(false)
    const { value, updateCookie } = useCookie("onboarding", "process")
    const [step, setStep] = useState<number>(0)

    const next = () => {
        setStep((prev) => prev + 1);
    };

    const prev = () => {
        setStep((prev) => prev - 1);
    };

    const {
        onboardingStatus,
        checkOnboardingStatus
    } = useOnboarding()

    const { hotel, getHotelDetails } = useHotel()
    const { setLoading } = useLoading()
    const navigate = useNavigate()

    useEffect(() => {
        withLoading(getHotelDetails, setLoading)
    }, [])

    const items: { content: ReactNode }[] = [
        {
            content: <HotelUpdateForm hotel={hotel} />
        },
        {
            content: <AddNewRoomForm
                hotel_id={hotel?.id}
                successCallback={(res) => {
                    setIsOnboardingFinishable(true)
                }}
                rejectCallback={() => {
                    message.error("Номер не был создан, повторите еще раз")
                }} />
        }
    ]

    if (onboardingStatus === "finish") {
        return <Navigate to={"/hotel"} />
    }

    if (onboardingStatus === "process")
        return (
            <MainLayout header="Добро пожаловать">
                {onboardingStatus}
                <Steps
                    status={onboardingStatus}
                    current={step}
                />

                <div style={contentStyle}>{items[step].content}</div>

                <div style={{ marginTop: 24 }}>

                    {step > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Назад
                        </Button>
                    )}
                    {step === items.length - 1 && (
                        <Button type="primary" disabled={!isOnboardingFinishable} onClick={() => {

                            checkOnboardingStatus()
                        }}>
                            Завершить
                        </Button>
                    )}
                    {step < items.length - 1 && (
                        <Button type="primary"  onClick={() => next()}>
                            Следующий
                        </Button>
                    )}
                </div>
            </MainLayout >
        )
}
export { FirstStart }