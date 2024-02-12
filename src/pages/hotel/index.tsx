import { useHotel } from "@/entities/hotel/api";
import { MainLayout } from "@/shared/layouts/layout";
import { Form, Input } from "antd";
import { FC, useEffect } from "react";

const HotelPage: FC = () => {
  const { currentHotel, setCurrentHotel } = useHotel()

  useEffect(() => {
    if (!currentHotel)
      setCurrentHotel()
  }, [])
  return (
    <MainLayout header="Мой отель" footer="">
      {JSON.stringify(currentHotel)}
      {
        currentHotel &&
        <Form layout="vertical" size="large">
          <Input value={currentHotel?.name} />

          <Input value={currentHotel?.description} />

          <Input value={currentHotel?.name} />

          <Input value={currentHotel?.name} />
        </Form>
      }

    </MainLayout>
  )
}

export { HotelPage }