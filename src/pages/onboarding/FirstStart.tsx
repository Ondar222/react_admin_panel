import { FC, ReactNode, useEffect, useState } from "react";
import { MainLayout } from "@/shared/layouts/layout";
import { Button, Col, Row, Steps, Typography, message } from "antd";
import { useHotel } from "@/entities";
import { useLoading, withLoading } from "@/processes";
import { useOnboarding } from "@/processes/onboarding/api/onboardingProvider";
import { HotelUpdateForm } from "@/widget/hotel/form/UpdateHotelForm";
import { AddNewRoomForm } from "@/widget";
import { Navigate } from "react-router-dom";
import { OnboardingStatus } from "@/processes/onboarding/model";

const OnboardingPageHeader: FC = () => {
    const { skipOnboarding } = useOnboarding()

    return (
        <Row justify={"space-between"}>
            <Typography.Title level={2}>Добро пожаловать</Typography.Title>
            <Button type="primary" onClick={() => skipOnboarding()}>Пропустить</Button>
        </Row>
    )
}

const FirstStart: FC = () => {
    const [isOnboardingFinishable, setIsOnboardingFinishable] = useState(false)
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
        },
        {
            content: (
                <>
                    {
                        isOnboardingFinishable && (
                            <Typography.Title>
                                Поздравляем с завершением онбординга
                            </Typography.Title>
                        )
                    }
                    {
                        !isOnboardingFinishable && (
                            <Typography.Title type="warning">
                                Возможно вы пропустили шаг
                            </Typography.Title>
                        )
                    }

                </>
            )
        }
    ]

    if (onboardingStatus === OnboardingStatus.FINISH) {
        return <Navigate to={"/hotel"} />
    }

    if (onboardingStatus === OnboardingStatus.PROCESS)
        return (
            <MainLayout header={<OnboardingPageHeader />}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        {items[step].content}
                    </Col>
                    <Col span={12}>
                        <Steps
                            direction="vertical"
                            status={onboardingStatus}
                            current={step}
                            items={[
                                {
                                    title: 'Обновление данных отеля',
                                    description: ""
                                },
                                {
                                    title: 'Создание первого номера',
                                    description: "",
                                },
                                {
                                    title: 'Завершение онбординга',
                                    description: "",
                                },
                            ]}
                        />

                        <div style={{ marginTop: 24 }}>
                            {step > 0 && (
                                <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                                    Назад
                                </Button>
                            )}
                            {step === items.length - 1 && (
                                <Button
                                    type="primary"
                                    disabled={!isOnboardingFinishable}
                                    onClick={() => {
                                        checkOnboardingStatus()
                                    }}
                                >
                                    Завершить
                                </Button>
                            )}
                            {step < items.length - 1 && (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        next()
                                    }}>
                                    Следующий
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </MainLayout >
        )
}
export { FirstStart }