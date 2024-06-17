import { useHotel, useRoom } from "@/entities";
import { MainLayout } from "@/shared/layouts/layout";
import {
  Button,
  Col,
  List,
  Row,
  Typography,
  Modal,
} from "antd";
import { FC, useEffect, useState } from "react";
import { HotelUpdateForm } from "@/widget/hotel/form/UpdateHotelForm";
import { useLoading, withLoading } from "@/processes";
import { useLogs } from "@/entities/logger/api/useLogs";
import { HotelPageHeader } from "@/shared/hotel/HotelPageHeader";
import { HotelPageFooter } from "@/shared/hotel/HotelPageFooter";
import { HotelJournal } from "@/widget/hotelJournal/HotelJournal";
import { AddressBuilderPresenter } from "@/widget/address/address-builder/presenter";

const HotelPage: FC = () => {
  const [visible, setVisible] = useState(false); // Состояние для модального окна

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const { hotel, getHotelDetails } = useHotel();
  const { rooms, getHotelRelatedRooms } = useRoom();
  const { setLoading } = useLoading();
  const { bookingLogs, getBookingLogs } = useLogs();

  const fetchData = async () => {
    await getHotelDetails();
    await getHotelRelatedRooms();
    await getBookingLogs();
  };

  useEffect(() => {
    withLoading(fetchData, setLoading);
  }, []);

  const initialAddress = {
    street: hotel?.address?.street || "",
    house: hotel?.address?.house || "",
    flat: hotel?.address?.flat || "",
    city: hotel?.address?.city || "",
    region: hotel?.address?.region || "",
  };

  return (
    <MainLayout header={<HotelPageHeader />} footer={<HotelPageFooter />}>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Typography.Title level={3}>Редактировать данные отеля</Typography.Title>
          <HotelUpdateForm hotel={hotel} />
        </Col>
        <Col span={12}>
          <Row>
            <Typography.Title level={3}>Журнал изменений</Typography.Title>
            <List
              pagination={{
                pageSize: 2,
                size: "small",
              }}
            >
              <HotelJournal />
            </List>
          </Row>
        </Col>
        <Col span={12}>
          <Button type="primary" onClick={() => setVisible(true)}>
            Построить адрес
          </Button>
          <Modal
            title="Построить адрес"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
          >
            <AddressBuilderPresenter address={initialAddress} />
          </Modal>
        </Col>
      </Row>
    </MainLayout>
  );
};

export { HotelPage };
