import { FC, useEffect, useState, useRef } from "react";
import { RoomSelect } from "@/widget/room/RoomSelect";
import { YurtaDatePicker } from "@/shared/range-picker";
import { Form, Button, message, notification } from "antd";
import { IRangePicker } from "@/shared/range-picker/model";
import { Room, useRoom } from "@/entities/room";
import { useHotel } from "@/entities/hotel";
import { useRoomLock } from "../../../entities/roomlock/api/useRoomlock";
import { LockReasonSelect } from "../../../shared/reason-select";
import { AxiosError } from "axios";
import { useRoomlockForm } from "@/features/useRoomlockForm";
import { LoadingPage } from "@/widget/loading_page";
import { useLoading, withLoading } from "@/processes";
import { Tour } from "antd";
import type { TourProps, Row } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const RoomlockCreationForm: FC = () => {
  const { setLoading } = useLoading();
  const { hotel, getHotelDetails } = useHotel();
  const { rooms, getHotelRelatedRooms } = useRoom();
  const { createRoomlock } = useRoomLock();
  const { dates, setDates } = useRoomlockForm();

  const [reason, setReason] = useState<string>("");
  const [room_id, setRoomId] = useState<number>(0);

  const ref = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Шаг 1",
      description: "Выберите тип заказа",
      placement: "bottom",
      target: () => ref.current,
    },
    {
      title: "Шаг 2",
      description: "Выберите на какое число хотите забронировать",
      placement: "bottom",
      target: () => ref.current,
    },
    {
      title: "Шаг 3",
      description: "Выберите подходящий вам номер",
      placement: "bottom",
      target: () => ref.current,
    },
    {
      title: "Шаг 4",
      description: "Нажмите забронировать",
      placement: "bottom",
      target: () => ref.current,
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
    <>
      <Form layout="vertical" size="large">
        <LockReasonSelect onChange={handleLockReason}  />
        <YurtaDatePicker value={dates} onChange={handleDatePickerChange} />

        <RoomSelect
          isMultiple={false}
          value={{ id: room_id }}
          rooms={rooms}
          onChange={(e) => {
            const room: Pick<Room, "id"> = e as Pick<Room, "id">;
            handleRoomSelectChange(room);
          }}
        />

        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Button onClick={handleSaveButtonClick}>Забронировать</Button>
          <Button type="default" onClick={() => setOpen(true)} ref={ref}>
          <QuestionCircleOutlined />
          </Button>
          <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
        </div>
      </Form>
    </>
  );
};

export { RoomlockCreationForm };
