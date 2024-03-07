import { Button, Flex, Form, InputNumber, Select, notification } from "antd";
import { FC, useState } from "react";
import { EBookingStatus } from "../../../entities/booking";
import { YurtaDatePicker } from "../../../shared/range-picker";
import { RoomSelect } from "../../room/room-select";
import { YurtaUserSelect } from "./user-select";
import type { Hotel } from "@/entities/hotel";
import { BookingCreateDto } from "../../../entities/booking/model/dto/BookingCreateDto";

interface IYurtaCreateForm {
  hotel: Hotel
  onSubmit: (e: BookingCreateDto) => void
}

const YurtaCreateForm: FC<IYurtaCreateForm> = ({ hotel, onSubmit }) => {
  const [state, setState] = useState<BookingCreateDto>(new BookingCreateDto())
  const [api] = notification.useNotification()

  return (
    <Form layout="vertical" size="large">
      <Flex vertical gap={2}>

        <Form.Item label="Сумма">
          <InputNumber
            placeholder="id"
            value={state.amount}
            color={"white"}
            onChange={(e) => {
              setState((prev) => {
                if (e)
                  return {
                    ...prev,
                    amount: e
                  }

                return prev
              })
            }}
          />
        </Form.Item>

        <Form.Item label="Статус">
          <Select
            value={state.status}
            options={Object.keys(EBookingStatus).map((status) => ({
              value: status,
              label: status
            }))}
            onChange={(e) => {
              setState((prev) => ({
                ...prev,
                status: e
              }))
            }}>
          </Select>
        </Form.Item>

        <Form.Item label="Количество гостей">
          <InputNumber value={state.capacity}
            onChange={(e) => {
              setState((prev) => {
                if (e)
                  return {
                    ...prev,
                    capacity: e
                  }
                return prev
              })
            }} />
        </Form.Item>


        <YurtaUserSelect
          value={state.user}
          onChange={(e) => {
            setState((prev) => {
              return {
                ...prev,
                user: e
              }
            })
          }} />

        {
          state.check_in
        }
        {
          state.check_out
        }

        <YurtaDatePicker
          label="Даты"
          value={[state?.check_in, state?.check_out]}
          onChange={(e) => {
            setState((prev) => ({
              ...prev,
              check_in: e[0],
              check_out: e[1]
            }))
          }}
        />

        {
          hotel && <RoomSelect
            value={state.rooms}
            isMultiple={true}
            rooms={hotel.rooms}
            onChange={(e) => {
              if (Array.isArray(e))
                setState((prev) => ({
                  ...prev,
                  rooms: e
                }))
            }
            }
          />
        }

        <Button onClick={() => {
          api.success({
            message: "Создана новая бронь"
          })
          onSubmit(state)
        }}>
          Сохранить
        </Button>
      </Flex>
    </Form>
  )
}

export { YurtaCreateForm }