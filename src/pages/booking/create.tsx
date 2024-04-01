import { MainLayout } from "@/shared/layouts/layout";
import { Button, Typography } from "antd";
import React, { FC } from "react";
import { RoomlockCreationForm } from "@/widget/roomlock/creation_form";
import { message } from "antd"

const BookingCreationPage: FC = React.memo(() => {
  return (
    <MainLayout
      header={<Typography.Title level={3}>Создание брони</Typography.Title>}
      footer={<></>}
    >
      <Button onClick={() => message.info('asd')} >click me</Button>
      <RoomlockCreationForm />
    </MainLayout >
  )
})


export default BookingCreationPage