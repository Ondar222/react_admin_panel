import { useBooking, useBrm } from "@/entities";
import { useCredentails } from "@/features/auth";
import { WithChildren } from "@/types/WithChildren";
import { Button, message, notification } from "antd";
import { FC, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client'

const socket = io(`${import.meta.env.VITE_WSS}/booking`);

const WSSProvider: FC<WithChildren> = ({ children }) => {
    const navigate = useNavigate()
    const { access_token } = useCredentails()
    const { addNewBooking } = useBooking()
    const { addBooking } = useBrm()
    useEffect(() => {
        socket.connect()
        socket.emit("auth", { access_token })

        socket.on('connect', () => {
            message.info('Создано соединение с сервером по WSS')
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('booking/create', (data) => {
            console.log(data)
            // addNewBooking(data)
            addBooking(data.success)
            notification.success({
                placement: "topRight",
                message: data.message,
                btn: <Button onClick={() => navigate(`/booking/${data.booking.id}`)}>Посмотреть</Button>
            })
        })

        return () => {
            socket.disconnect();
        };
    }, [])

    return children
}

export { WSSProvider }