import { useHotel } from "@/entities";
import { MainLayout } from "@/shared/layouts/layout";
import {
  Button,
  Card,
  Col,
  Flex,
  Image,
  List,
  Row,
  Space,
  Typography,
} from "antd";
import { FC, useEffect } from "react";
import { HotelUpdateForm } from "@/widget/hotel/form/UpdateHotelForm";
import { useLoading, withLoading } from "@/processes";



const fakeJournal = [
  {
    id: 1,
    message: "Пользователь изменил данные отеля",
  },
  {
    id: 2,
    message: `Пользователь удалил номер "Купол с видом на реку"`,
  },
  {
    id: 3,
    message: `Пользователь заблокировал номер "Юрта с видом на реку"`,
  },
];

const HotelPage: FC = () => {
  const { hotel, getHotelDetails } = useHotel();
  const { setLoading } = useLoading();

  const fetchData = async () => {
    await getHotelDetails();
  };

  useEffect(() => {
    withLoading(fetchData, setLoading);
  }, []);

  return (
    <MainLayout header={<HotelPageHeader />} footer={<HeaderPageFooter />}>
      <Row gutter={[32, 32]}>
        <Col span={16}>
          <Typography.Title level={3}>
            Редактировать данные отеля
          </Typography.Title>
          <HotelUpdateForm hotel={hotel} />
        </Col>
        <Col span={8}>
          <Row>
            <Typography.Title level={3}>
              Журнал изменений (beta)
            </Typography.Title>
          </Row>
          <Row>
            <List>
              {fakeJournal.map((journal) => {
                return (
                  <List.Item
                    title={journal.message}
                  >
                    <Typography>{journal.message}</Typography>
                  </List.Item>
                );
              })}
            </List>
          </Row>
        </Col>
      </Row>
      
    </MainLayout>
  );
};

export { HotelPage };

const HotelPageHeader: FC = () => {
  return <Typography.Title level={2}>Мой отель</Typography.Title>;
};

const HeaderPageFooter: FC = () => {
  return <div></div>;
};
