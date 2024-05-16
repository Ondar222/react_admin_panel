import { useBrm } from "@/entities";
import { useCredentails } from "@/features/auth";
import { WithChildren } from "@/types/WithChildren";
import { Button, Typography, message, notification } from "antd";
import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client'
import { useAuth } from "../auth/authProvider";

const socket = io(`${import.meta.env.VITE_WSS}/booking`, {
    secure: true
});

const WSSProvider: FC<WithChildren> = ({ children }) => {
    const { isAuth } = useAuth()
    const [isWssConnected, setIsWssConntected] = useState<boolean>(false)
    const { access_token } = useCredentails()
    const navigate = useNavigate()
    const { addBooking } = useBrm()

    const connectToWsServer = useCallback(() => {
        socket.connect()
        socket.emit("auth", { access_token })

        socket.on('connect', () => {
            setIsWssConntected(true)
        })

        socket.on('message', (data) => {
            console.log(data)
            notification.success({
                message: data.content.message,
                placement: "topRight"
            })
        })

        socket.on('disconnect', () => {
            setIsWssConntected(false)
        });

        socket.on('booking/create', (data) => {
            addBooking(data?.success)
            notification.success({
                placement: "topRight",
                message: data?.message,
                btn: <Button onClick={() => navigate(`/booking/${data?.success?.id}`)}>Посмотреть</Button>
            })
        })
    }, [access_token])

    useEffect(() => {
        console.log(isAuth)
        if (isAuth === false) {
            socket.disconnect();
            console.log('disconnected from ws server')
        }
        
        if (isAuth === true && !isWssConnected) {
            connectToWsServer()
        }

        return () => {
            socket.disconnect();
        };
    }, [isAuth])

    return <>
        <Typography>{isAuth}</Typography>
        {children}
    </>
}

export { WSSProvider }