import { useHotel } from "@/entities/hotel";
import { MainLayout } from "@/shared/layouts/layout";
import { Col, Typography, } from "antd";
import { FC, useEffect, useState } from "react";
import { LoadingPage } from "@/widget/loading_page";
import { HotelUpdateForm } from "@/widget/hotel/form/UpdateHotelForm";



const HotelPage: FC = () => {
  const { hotel, getHotelDetails } = useHotel()

  useEffect(() => {
    getHotelDetails()
  }, [])

  if (!hotel)
    return <LoadingPage />

  return (
    <MainLayout header={<Typography.Title level={2}>Мой отель</Typography.Title>}>
      <HotelUpdateForm hotel={hotel} />
    </MainLayout >
  )
}

export { HotelPage }