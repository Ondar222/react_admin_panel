import { FC, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { useEffect } from "react"
import { BookingCard, useBooking } from "@/entities/booking"
import { useCalendar } from "@/entities/calendar"
import { ICalendar } from "@/entities/calendar/model/interface"
import { Button, Col, Collapse, Layout, Row, Select } from "antd"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { useNavigate } from "react-router-dom"
import { YurtaCalendarPage } from "../calendar"
import { CalendarUI } from "@/entities/calendar/ui"
import { useBrm } from "@/entities/calendar/api/useBrm"
import { RoomLockCreationForm } from "@/entities/room/ui/lock/creation-form"

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

const BookingPage: FC = () => {
  const [mode, setMode] = useState<BookingPageVM>(BookingPageVM.calendar)
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
          title="Активные брони"
          onCreateButtonClick={() => navigate("/booking/+")} />
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
            return <option value={mode.name}>{mode.label_ru}</option>
          })
        }
      </Select>

      {/* <Collapse
        items={calendar.map((calendar: ICalendar, index) => ({
          key: index,
          label: calendar.date,
          children: <Row gutter={[16, 16]} >
            {
              [...calendar.booking].map((booking) => {
                return (
                  <Col key={booking.id} span={6}>
                    <BookingCard
                      id={booking.id}
                      amount={booking.amount}
                      status={booking.status}
                      check_in={booking.check_in}
                      check_out={booking.check_out}
                      capacity={booking.capacity}
                      user={booking.user}
                      rooms={booking.rooms} />
                  </Col>
                )
              })
            }
          </Row>
        }))
        }
      /> */}

      {mode === BookingPageVM.calendar &&
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <RoomLockCreationForm />
          </Col>
          <Col span={18}>
            <CalendarUI brm={brm} onClick={(e) => {
              const id = e.event.extendedProps.item_id
              const entity = e.event.extendedProps.type
              navigate(`/${entity}/${id}`)
            }} />
          </Col>
        </Row>
      }
    </MainLayout >


  )
}

export { BookingPage }

