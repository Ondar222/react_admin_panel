import { MainLayout } from "@/shared/layouts/layout";
import { Typography } from "antd";
import React, { FC, useEffect } from "react";
import { useHotel } from "@/entities/hotel/api";
import { useBooking } from "@/entities/booking";
import { YurtaCreateForm } from "@/entities/booking/ui/form/create";
import { RoomLockCreationForm } from "@/entities/room/ui/lock/creation-form";


const BookingCreationPage: FC = React.memo(() => {
  const { hotel, setHotel } = useHotel()
  const { create } = useBooking()

  useEffect(() => {
    setHotel()
  }, [])

  return (
    <MainLayout
      header={<Typography.Title level={3}>Создание брони</Typography.Title>}
      footer={<></>}
    >
      <RoomLockCreationForm />
      
    </MainLayout >
  )
})


export default BookingCreationPage