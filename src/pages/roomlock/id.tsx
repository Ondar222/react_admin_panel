import { useRoomLock } from "@/entities/roomlock";
import { MainLayout } from "@/shared/layouts/layout";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomlockDetailsPage: FC = () => {
    const { id } = useParams()

    const { roomlock_details, getRoomLockDetailsByID } = useRoomLock()

    useEffect(() => {
        getRoomLockDetailsByID(Number(id))
    }, [])

    return (
        <MainLayout header={<div></div>} footer={<div></div>}  >
            {
                JSON.stringify(roomlock_details)
            }

        </MainLayout>)
}

export { RoomlockDetailsPage }