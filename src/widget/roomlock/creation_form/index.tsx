import { FC, useEffect, useState, useRef } from "react";
import { RoomSelect } from "@/widget/room/RoomSelect";
import { RangePicker } from "@/shared/base/RangePicker";
import { Form, Button, message, notification, Row, Typography } from "antd";
import { IRangePicker } from "@/shared/base/RangePicker/model";
import { Room, useRoom, useHotel, useRoomLock } from "@/entities";
import { LockReasonSelect } from "../../../shared/reason-select";
import { AxiosError } from "axios";
import { useRoomlockForm } from "@/features";
import { LoadingPage } from "@/widget/loading_page";
import { useLoading } from "@/processes";
import { Tour, Col } from "antd";
import type { TourProps } from "antd";

const RoomlockCreationForm: FC = () => {
  const { setLoading } = useLoading();
  const { hotel, getHotelDetails } = useHotel();
  const { rooms, getHotelRelatedRooms } = useRoom();
  const { createRoomlock } = useRoomLock();
  const { dates, setDates } = useRoomlockForm();

  const [reason, setReason] = useState<string>("");
  const [room_id, setRoomId] = useState<number>(0);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Шаг 1",
      description: "Выберите тип заказа",
      target: () => ref1.current,
    },
    {
      title: "Шаг 2",
      description: "Выберите подходящий срок",
      target: () => ref2.current,
    },
    {
      title: "Шаг 3",
      description: "Подберите подходящий вам номер",
      target: () => ref3.current,
    },
    {
      title: "Шаг 4",
      description: "Поздравляю!Нажмите 'Забронировать' ",
      target: () => ref4.current,
    },
  ];

  useEffect(() => {
    getHotelRelatedRooms().then((res) => {
      setRoomId(rooms[0].id);
    });
    getHotelDetails();
  }, []);

  const handleDatePickerChange: IRangePicker["onChange"] = (dates) => {
    setDates([dates[0], dates[1]]);
  };

  const handleRoomSelectChange = (e: Pick<Room, "id">) => {
    setRoomId(e?.id);
  };

  const handleLockReason = (e) => {
    setReason(e);
  };

  const handleSaveButtonClick = async () => {
    const data = await createRoomlock({
      room_id: room_id,
      start: dates[0],
      end: dates[1],
      reason: reason,
    })
      .then((res) => {
        message.success("Номер заблокирован");
      })
      .catch((error: AxiosError) => {
        notification.error({
          message: "Произошла ошибка при блокировке номера",
          placement: "topRight",
        });
      });
  };

  if (!hotel) {
    return <LoadingPage layout="main" />;
  }

  return (
    <Form.Provider>
      <Form
        layout="vertical"
        size="large"
        title="Добавить событие"
        style={{
          width: "100%"
        }}>

        <Form.Item >
          <Typography.Title level={3}>Добавить событие</Typography.Title>
        </Form.Item>

        <Form.Item label="Причина блокировки">
          <LockReasonSelect onChange={handleLockReason} ref={ref1} />
        </Form.Item>

        <Row justify={"space-between"} ref={ref2} style={{
          width: "100%"
        }}>
          <Form.Item label="Даты" style={{
            width: "100%"
          }}>
            <RangePicker
              value={dates}
              onChange={handleDatePickerChange}
              style={{
                width: "100%"
              }}
            />
          </Form.Item>
        </Row>
        <Row ref={ref3}>
          <Form.Item label="Номера" style={{
            width: "100%"
          }}>
            <RoomSelect
              value={{ id: room_id }}
              rooms={rooms}
              onChange={(e) => {
                const room: Pick<Room, "id"> = e as Pick<Room, "id">;
                handleRoomSelectChange(room);
              }}
              style={{
                width: "100%"
              }}
            />
          </Form.Item>
        </Row>

        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button ref={ref4} onClick={handleSaveButtonClick}>
            Забронировать
          </Button>

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
        </Row>
      </Form>
    </Form.Provider >
  );
};

export { RoomlockCreationForm };
