import { FC, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { useEffect } from "react"
import { useBooking } from "@/entities/booking"
import { Col, Row, Button, Typography, Flex, Divider, Space } from "antd"
import { Calendar } from "@/widget/calendar/ui"
import { useBrm } from "@/entities/calendar/api/useBrm"
import { useRoomlockForm } from "@/features/useRoomlockForm"

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

const BookingPageHeader: FC = () => {
  const { setIsRoomlockCreationFormOpen } = useRoomlockForm()
  return (
    <Flex justify="space-between" align="center">
      <Typography.Title level={2}>Активные брони</Typography.Title>
      <Button type="primary" onClick={() => setIsRoomlockCreationFormOpen(true)}>Добавить событие</Button>
    </Flex>
  )
}

const BookingPage: FC = () => {
  const [mode, setMode] = useState<BookingPageVM>(BookingPageVM.calendar)
  const { setIsRoomlockCreationFormOpen } = useRoomlockForm()
  const { bookings, getAllBookings } = useBooking()
  const { brm, getAll } = useBrm()

  useEffect(() => {
    getAll()
    getAllBookings()
  }, [])

  return (
    <MainLayout
      header={<BookingPageHeader />}
      footer={<></>}
    >
      <Col span={24}>
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

        {
          mode === BookingPageVM.calendar &&

          <Calendar
            brm={brm}
          />

        }

        {/* {
        mode === BookingPageVM.list &&
        <BookingList data={brm} />
      }
      {
        mode === BookingPageVM.brick &&
        <BookingBrick data={bookings} />
      } */}
      </Col>



    </MainLayout >

  )
}


export { BookingPage }