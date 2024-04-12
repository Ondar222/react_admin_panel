import { FC, useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment"
import listPlugin from '@fullcalendar/list'
import dayjs from "dayjs";
import { CalendarOptions, CustomContentGenerator, EventContentArg } from "@fullcalendar/core/index.js";
import { Booking } from "@/entities/booking";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Button, Modal, Typography } from "antd";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { ICalendar } from "../model";
import { Roomlock } from "@/entities/roomlock";
import { Link, useNavigate } from "react-router-dom";
import { RoomlockCreationForm } from "@/widget/roomlock/creation_form";
import { useRoomlockForm } from "@/features/useRoomlockForm";

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"

const Calendar: FC<ICalendar> = (props) => {
  const [rerender, setRerender] = useState<number>(0)
  const { isRoomlockCreationFormOpen, setIsRoomlockCreationFormOpen, dates, setDates } = useRoomlockForm()

  const handleDateClick: CalendarOptions["dateClick"] = (props) => {
    setIsRoomlockCreationFormOpen(true)
    setDates([dayjs(props.dateStr).unix(), dayjs(props.dateStr).unix()])
  }

  useEffect(() => {
    setTimeout(() => {
      setRerender(2)
    }, 500)
  }, [])

  const calendar_options: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, momentPlugin, momentTimezonePlugin, listPlugin],
    initialView: 'dayGridMonth',
    dayCellClassNames: 'brm-cell',
    weekends: true,
    headerToolbar: {
      left: 'list',
      center: "title",
      right: 'prev,dayGridMonth,next',
    },
    nextDayThreshold: '00:00',
    dateClick: handleDateClick,
    locales: [ruLocale],
    progressiveEventRendering: true,
    dayMaxEvents: 1,
    events: props.brm.map((brm) => {
      if (brm.type === 'booking') {
        const booking = brm.item as Booking
        return {
          item_id: booking.id,
          title: `Бронь №${booking.id} Статус: ${booking.status}`,
          start: dayjs(booking.check_in * 1000).tz(tz).format(),
          end: dayjs(booking.check_out * 1000).tz(tz).format(),
          url: `/booking/${booking.id}`
        }
      }

      if (brm.type === 'room_lock') {
        const roomlock = brm.item as Roomlock

        return {
          item_id: roomlock.id,
          title: `Блокировка номера №${roomlock.id} Статус: ${roomlock.status}`,

          start: dayjs(roomlock.start * 1000).tz(tz).format(),
          end: dayjs(roomlock.end * 1000).tz(tz).format(),
          url: `/roomlock/${roomlock.id}`
          // onclick: () => navigate(`/roomlock/${roomlock.id}`)
        }
      }
    }),
    eventDisplay: "",
    eventOverlap: (stillEvent, movingEvent) => {
      return stillEvent.allDay && movingEvent.allDay;
    },
    eventContent: (e) => renderEventContent
  }
  return (
    <>
      {
        rerender > 1 && <FullCalendar
          {...calendar_options}
        />
      }

      <Modal open={isRoomlockCreationFormOpen}
        destroyOnClose
        cancelText={"Закрыть"}
        okText="Забронировать"
        footer={[
          <Button onClick={() => setIsRoomlockCreationFormOpen(false)}>Закрыть</Button>
        ]}
        onCancel={() => setIsRoomlockCreationFormOpen(false)} onOk={() => setIsRoomlockCreationFormOpen(false)}>
        <RoomlockCreationForm />
      </Modal>

    </>

  )
}

const renderEventContent = (eventInfo: EventContentArg): CustomContentGenerator<EventContentArg> => {
  return (
    <Link to={eventInfo.event.url} style={{ width: '100%' }}>
      <Button style={{ width: '100%' }}>
        <Typography.Text ellipsis={true}>
          {eventInfo.event.title}
        </Typography.Text>
      </Button>
    </Link>
  )
}

export { Calendar }

