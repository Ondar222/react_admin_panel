import { useRoomLock } from "@/entities/roomlock";
import { MainLayout } from "@/shared/layouts/layout";
import { LoadingPage } from "@/widget/loading_page";
import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomlockDetailsPage: FC = () => {
    const { id } = useParams()

    const { roomlock_details, getRoomLockDetailsByID } = useRoomLock()

    useEffect(() => {
        getRoomLockDetailsByID(Number(id))
    }, [])

    if (roomlock_details.id != Number(id) || !roomlock_details) return <LoadingPage />

    return (
        <MainLayout header={<div></div>} footer={<div></div>}  >
            {
                JSON.stringify(roomlock_details)
            }
        </MainLayout>)
}

export { RoomlockDetailsPage }