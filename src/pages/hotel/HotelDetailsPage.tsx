import { useHotel, useRoom } from "@/entities";
import { MainLayout } from "@/shared/layouts/layout";
import {
  Col,
  List,
  Row,
  Typography,
} from "antd";
import { FC, useEffect } from "react";
import { HotelUpdateForm } from "@/widget/hotel/form/UpdateHotelForm";
import { useLoading, withLoading } from "@/processes";
import { useLogs } from "@/entities/logger/api/useLogs";
import { HotelPageHeader } from "@/shared/hotel/HotelPageHeader";
import { HotelPageFooter } from "@/shared/hotel/HotelPageFooter";
import { HotelJournal } from "@/widget/hotelJournal/HotelJournal";

const HotelPage: FC = () => {
  const { hotel, getHotelDetails } = useHotel();
  const { rooms, getHotelRelatedRooms } = useRoom()
  const { setLoading } = useLoading();
  const { bookingLogs, getBookingLogs } = useLogs()

  const fetchData = async () => {
    await getHotelDetails();
    await getHotelRelatedRooms()
    await getBookingLogs();
  };

  useEffect(() => {
    withLoading(fetchData, setLoading);
  }, []);

  return (
    <MainLayout header={<HotelPageHeader />} footer={<HotelPageFooter />}>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Typography.Title level={3}>
            Редактировать данные отеля
          </Typography.Title>
          <HotelUpdateForm hotel={hotel} />
        </Col>
        <Col span={12}>
          <Row>
            <Typography.Title level={3}>
              Журнал изменений
            </Typography.Title>
            <List
              pagination={{
                pageSize: 2,

                size: "small"
              }}>
              <HotelJournal />
            </List>
          </Row>
        </Col>
      </Row>
    </MainLayout>
  );
};

export { HotelPage };

<HotelPageHeader />;

<HotelPageFooter/>


