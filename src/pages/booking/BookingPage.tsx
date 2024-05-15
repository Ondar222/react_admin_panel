import { FC, useState } from "react";
import { MainLayout } from "../../shared/layouts/layout";
import { useEffect, useRef } from "react";
import { useBooking, useBrm } from "@/entities";
import {
  Col,
  Button,
  Typography,
  Flex,
  Space,
  Tooltip,
  Tour,
  TourProps,
} from "antd";
import { Calendar } from "@/widget/calendar/ui";
import { useRoomlockForm } from "@/features/roomlock/useRoomlockForm";
import { LoadingPage } from "@/widget/loading_page";

const colors = ["blue"];

enum BookingPageViewMode {
  calendar = "calendar",
  list = "list",
  brick = "brick",
}

const BookingPageVMDecoder = [
  {
    type: BookingPageViewMode.calendar,
    name: "calendar",
    label_ru: "Календарь",
  },
  {
    type: BookingPageViewMode.list,
    name: "list",
    label_ru: "Список",
  },
  {
    type: BookingPageViewMode.brick,
    name: "brick",
    label_ru: "Плитки",
  },
];

const BookingPageHeader: FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Бронь номера",
      description: "Здесь можете забронировать номер",
      target: () => ref1.current,
    },
    {
      title: "Выберите любую дату в календаре",
      description: "Создать/посмотреть событие",
      target: () => ref2.current,
    },
  ];
  const { setIsRoomlockCreationFormOpen } = useRoomlockForm();
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={2}>Активные брони</Typography.Title>
      <Col style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <Col>
          <Space wrap>
            {colors.map((color) => (
              <Tooltip title="Забронируйте номер" color={color} key={color}>
                <Button
                  ref={ref1}
                  type="default"
                  onClick={() => setIsRoomlockCreationFormOpen(true)}
                >
                  Добавить событие
                </Button>
              </Tooltip>
            ))}
            <Col>
              <Button type="primary" onClick={() => setOpen(true)}>
                ?
              </Button>
              <Tour
                open={open}
                onClose={() => setOpen(false)}
                mask={false}
                type="primary"
                steps={steps}
              />
            </Col>
          </Space>
        </Col>
      </Col>
    </Flex>
  );
};

const BookingPage: FC = () => {
  const [mode, setMode] = useState<BookingPageViewMode>(BookingPageViewMode.calendar);
  const { getAllBookings } = useBooking();
  const { brm, getAll } = useBrm();

  useEffect(() => {
    getAll();
    getAllBookings();
  }, []);

  if (!brm) {
    return <LoadingPage layout="main" />
  }

  return (
    <MainLayout
      header={<BookingPageHeader />}
      footer={<></>}
    >
      <Col span={24} style={{ height: "100%" }}>
        {/* <Flex justify="end" align="end">
          <Select
          style={{ width: '150px' }}
          defaultValue={BookingPageVMDecoder[0].name}
          onChange={(e) => setMode(e as BookingPageVM)}
          options={BookingPageVMDecoder.map((mode) => ({
            label: mode.label_ru,
            value: mode.name
          }))}
        />

        </Flex> */}

        {mode === BookingPageViewMode.calendar && <Calendar brm={brm} />}

        {/* {
        mode === BookingPageVM.list &&
        <BookingList data={brm} />
      }
      {
        mode === BookingPageVM.brick &&
        <BookingBrick data={bookings} />
      } */}
      </Col>
    </MainLayout>
  );
};

export { BookingPage };
