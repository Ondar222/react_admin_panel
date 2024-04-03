import { FC, ReactNode, useEffect, useState } from "react";
import { MainLayout } from "@/shared/layouts/layout";
import { Button, Steps, message } from "antd";
import { useHotel } from "@/entities/hotel";
import { useLoading, withLoading } from "@/processes";
import { useRoom } from "@/entities/room";
import { checkOnboardingStatus, useOnboarding } from "@/processes/onboarding/api/onboardingProvider";
import { HotelUpdateForm } from "@/widget/hotel/form/UpdateHotelForm";
import { RoomCreationPage } from "..";
import { AddNewHotelForm } from "@/widget/hotel/form/AddNewHotelForm";
import { AddNewRoomForm } from "@/widget";
import { Navigate, useNavigate } from "react-router-dom";

const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 16,
};



const FirstStart: FC = () => {
    const [step, setStep] = useState<number>(0)

    const next = () => {
        setStep((prev) => prev + 1);
    };

    const prev = () => {
        setStep((prev) => prev - 1);
    };

    const {
        currentStep,
        setCurrentStep,
        currentStepProgress,
        setCurrentStepProgress,
        onboardingStatus,
        setOnboardingStatus
    } = useOnboarding()

    const { hotel, getHotelDetails } = useHotel()
    const { rooms, getHotelRelatedRooms } = useRoom()
    const { setLoading } = useLoading()
    const navigate = useNavigate()

    useEffect(() => {
        withLoading(getHotelRelatedRooms, setLoading)
        withLoading(getHotelDetails, setLoading)

        checkOnboardingStatus(
            setOnboardingStatus,
            setCurrentStep,
            setCurrentStepProgress,
            hotel,
            rooms
        )
    }, [])

    const items: { content: ReactNode }[] = [
        {
            content: <HotelUpdateForm hotel={hotel} />
        },
        {
            content: <AddNewRoomForm
                hotel_id={hotel.id}
                successCallback={(res) => {
                    console.log(res)
                }}
                rejectCallback={() => {
                    console.log('data')
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
                // items={items.map((item) => ({
                //     description: item.content
                // }))}
                />

                <div style={contentStyle}>{items[step].content}</div>

                <div style={{ marginTop: 24 }}>

                    {step > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Назад
                        </Button>
                    )}
                    {step === items.length - 1 && (
                        <Button type="primary" onClick={() => {
                            message.success('Processing complete!')
                            checkOnboardingStatus(
                                setOnboardingStatus,
                                setCurrentStep,
                                setCurrentStepProgress,
                                hotel,
                                rooms
                            )
                        }}>
                            Завершить
                        </Button>
                    )}
                    {step < items.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Следующий
                        </Button>
                    )}
                </div>
            </MainLayout >
        )
}
export { FirstStart }