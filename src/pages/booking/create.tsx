import { MainLayout } from "@/shared/layouts/layout";
import { Typography } from "antd";
import React, { FC } from "react";
import { RoomlockCreationForm } from "@/widget/room-lock/creation_form";


const BookingCreationPage: FC = React.memo(() => {
  return (
    <MainLayout
      header={<Typography.Title level={3}>Создание брони</Typography.Title>}
      footer={<></>}
    >
      <RoomlockCreationForm />
    </MainLayout >
  )
})


export default BookingCreationPage