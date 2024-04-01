import { FC, useMemo, useState } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { useEffect } from "react"
import { useBooking } from "@/entities/booking"
import { Col, Row, Select, Button, Typography, Flex, Divider } from "antd"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { Calendar } from "@/widget/calendar/ui"
import { useBrm } from "@/entities/calendar/api/useBrm"
import { RoomlockCreationForm } from "@/widget/roomlock/creation_form"
import { BookingList } from "@/widget/booking/list-view"
import { BookingBrick } from "@/widget/booking/brick-view"
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
      header={
        <Flex justify="space-between" align="center">
          <Typography.Title level={2}>Активные брони</Typography.Title>

        </Flex>
      }
      footer={<></>}
    >
      <Flex justify="space-between" align="center">
        <Select
          style={{ width: '150px' }}
          defaultValue={BookingPageVMDecoder[0].name}
          onChange={(e) => setMode(e as BookingPageVM)}
          options={BookingPageVMDecoder.map((mode) => ({
            label: mode.label_ru,
            value: mode.name
          }))}
        />
        <Button type="primary" onClick={() => setIsRoomlockCreationFormOpen(true)}>Добавить событие</Button>
      </Flex>

      <Divider />

      {
        mode === BookingPageVM.calendar &&
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Calendar
              brm={brm}
            />
          </Col>
        </Row>
      }

      {
        mode === BookingPageVM.list &&
        <BookingList data={brm} />
      }
      {
        mode === BookingPageVM.brick &&
        <BookingBrick data={bookings} />
      }


    </MainLayout >

  )
}


export { BookingPage }