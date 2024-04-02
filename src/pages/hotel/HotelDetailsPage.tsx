import { useHotel } from "@/entities/hotel";
import { MainLayout } from "@/shared/layouts/layout";
import { Typography, } from "antd";
import { FC, useEffect } from "react";
import { UpdateHotelForm } from "@/widget/hotel/form/UpdateHotelForm";
import { useLoading, withLoading } from "@/processes";

const HotelPage: FC = () => {
  const { hotel, getHotelDetails } = useHotel()
  const { setLoading } = useLoading()

  const fetchData = async () => {
    await getHotelDetails()
  }

  useEffect(() => {
    withLoading(fetchData, setLoading)
  }, [])

  return (
    <MainLayout header={<Typography.Title level={2}>Мой отель</Typography.Title>}>
      <UpdateHotelForm hotel={hotel} />
    </MainLayout >
  )
}

export { HotelPage }