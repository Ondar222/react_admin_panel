import { FC, useMemo, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { useEffect } from "react"
import { useBooking } from "@/entities/booking"
import { Col, NotificationArgsProps, Row, Select, notification } from "antd"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { useNavigate } from "react-router-dom"
import { CalendarUI } from "@/entities/calendar/ui"
import { useBrm } from "@/entities/calendar/api/useBrm"
import React from "react"
import { RoomLockCreationForm } from "@/widget/room-lock/creation_form"
import { BookingList } from "@/widget/booking/list-view"
import { BookingBrick } from "@/widget/booking/tiles"

enum BookingPageVM {
  calendar = 'calendar',
  list = 'list',
  brick = 'brick'
}

const BookingPageVMDecoder = [
  {
    type: BookingPageVM.calendar,
    name: 'calendar',
    label_ru: 'Календарь'
  },
  {
    type: BookingPageVM.list,
    name: 'list',
    label_ru: 'Список'
  },
  {
    type: BookingPageVM.brick,
    name: 'brick',
    label_ru: 'Плитки'
  }
]

type NotificationPlacement = NotificationArgsProps['placement'];

const Context = React.createContext({ name: 'Default' });

const BookingPage: FC = () => {
  const [mode, setMode] = useState<BookingPageVM>(BookingPageVM.calendar)
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };

  const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

  const { booking, findAll } = useBooking()
  // const { calendar, getAll } = useCalendar()
  const { brm, getAll } = useBrm()
  const navigate = useNavigate()

  useEffect(() => {
    getAll()
    findAll()
  }, [])

  return (
    <MainLayout
      header={
        <DetailsHeader
          title="Активные брони" />
      }
      footer={<></>}
    >

      <Select
        style={{ width: '150px' }}
        defaultValue={BookingPageVMDecoder[0].name}
        onChange={(e) => setMode(e as BookingPageVM)}

      >


        {
          BookingPageVMDecoder.map((mode) => {
            return <option key={mode.name} value={mode.name}>{mode.label_ru}</option>
          })

        }


      </Select>

      {mode === BookingPageVM.calendar &&
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <RoomLockCreationForm />
          </Col>
          <Col span={18}>
            <CalendarUI
              brm={brm}
              onClick={(e) => {
                const id = e.event.extendedProps.item_id
                const entity = e.event.extendedProps.type
                navigate(`/${entity}/${id}`)

              }}
            />
          </Col>
          <Col>
          </Col>
        </Row>
      }

      {
        mode === BookingPageVM.list &&
        <BookingList data={brm} />
      }
      {
        mode === BookingPageVM.brick &&
        <BookingBrick data={booking} />
      }


    </MainLayout >

  )
}


export { BookingPage }

