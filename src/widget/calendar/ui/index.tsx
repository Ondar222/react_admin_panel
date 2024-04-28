import { FC, LegacyRef, useEffect, useRef, useState } from "react";
import { Booking, Roomlock } from "@/entities";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment"
import listPlugin from '@fullcalendar/list'
import dayjs from "dayjs";
import { CalendarOptions, CustomContentGenerator, EventContentArg } from "@fullcalendar/core/index.js";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Button, Col, Flex, Grid, Modal, Row, Typography } from "antd";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { ICalendar } from "../model";
import { Link } from "react-router-dom";
import { RoomlockCreationForm } from "@/widget/roomlock/creation_form";
import { useRoomlockForm } from "@/features/useRoomlockForm";

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"

const Calendar: FC<ICalendar> = (props) => {
  const calendarRef: LegacyRef<FullCalendar> = useRef(null)
  const [isDayContextMenuOpen, setIsDayContextMenuOpen] = useState<boolean>(false)
  const { isRoomlockCreationFormOpen, setIsRoomlockCreationFormOpen, dates, setDates } = useRoomlockForm()

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.on('dateClick', handleDateClick);
      calendarApi.on('eventClick', handleEventClick);

      const monthButton = document.querySelector('.fc-dayGridMonth-button');

      if (monthButton) {
        monthButton.addEventListener('click', handleMonthViewClick);
      }
    }
    return () => {
      const monthButton = document.querySelector('.fc-dayGridMonth-button');


      calendarApi.off('dateClick', handleDateClick);
      calendarApi.off('eventClick', handleEventClick);

      if (monthButton) {
        monthButton.removeEventListener('click', handleMonthViewClick)
      }
    };
  }, []);

  const changeView = (view: "list" | "dayGridMonth") => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.changeView(view)
  }

  const handleDateClick: CalendarOptions["dateClick"] = (props) => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.gotoDate(props.date)
    setIsDayContextMenuOpen(true)
    setDates([dayjs(props.dateStr).unix(), dayjs(props.dateStr).unix()])
  }

  const handleMonthViewClick = (element) => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.changeView('dayGridMonth')
  }

  const handleEventClick = (arg) => {
    console.log(arg)
  }


  return (
    <>
      {
        <FullCalendar
          ref={calendarRef}
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            momentPlugin,
            momentTimezonePlugin,
            listPlugin
          ]}

          initialView="dayGridMonth"
          dayCellClassNames='brm-cell'
          weekends={true}
          headerToolbar={{
            left: 'list',
            center: "title",
            right: 'prev,dayGridMonth,next',
          }}

          nextDayThreshold='00:00'
          locales={[ruLocale]}
          progressiveEventRendering={true}
          dayMaxEvents={1}
          events={props.brm.map((brm) => {
            if (brm.type === 'booking') {
              const booking = brm.item as Booking
              console.group("бронь №", booking.id)
              console.log(dayjs(booking.check_in * 1000).tz(tz).format())
              console.log(dayjs(booking.check_out * 1000).tz(tz).format())
              console.groupEnd()
              return {
                item_id: booking.id,
                title: `Бронь №${booking.id} Статус: ${booking.status}`,
                start: dayjs(booking.check_in * 1000).tz(tz).format(),
                end: dayjs(booking.check_out * 1000).tz(tz).format(),
                url: `/booking/${booking.id}`
              }
            }
            console.log(brm.type === 'room_lock')
            if (brm.type === 'room_lock') {

              const roomlock = brm.item as Roomlock
              console.group("румлок №", roomlock.id)
              console.log(dayjs(roomlock.start * 1000).tz(tz).format())
              console.log(dayjs(roomlock.end * 1000).tz(tz).format())
              console.groupEnd()
              return {
                item_id: roomlock.id,
                title: `Блокировка номера №${roomlock.id} Статус: ${roomlock.status}`,

                start: dayjs(roomlock.start * 1000).tz(tz).format(),
                end: dayjs(roomlock.end * 1000).tz(tz).format(),
                url: `/roomlock/${roomlock.id}`
              }
            }
          })}
          eventContent={renderEventContent}
        />
      }

      <Modal
        open={isDayContextMenuOpen}
        destroyOnClose
        cancelText={"Закрыть"}
        onCancel={() => setIsDayContextMenuOpen(false)}
        okText="Забронировать"
        title="Что вы хотите сделать?"
        footer={null}
      >
        <Flex
          vertical
          gap={10}
        >
          <Row gutter={[16, 16]} justify={"space-between"}>
            <Col span={12}>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  changeView("list")
                  setIsDayContextMenuOpen(false)
                }}>
                Посмотреть повестку
              </Button>
            </Col>
            <Col span={12}>
              <Button
                style={{ width: "100%" }}
                onClick={() => {
                  setIsDayContextMenuOpen(false)
                  setIsRoomlockCreationFormOpen(true)
                }}>
                Создать событие
              </Button>
            </Col>
          </Row>
          <Row gutter={[16, 16]} justify={"space-between"}>
            <Col span={12}>
              <Button
                style={{ width: "100%" }}
              >
                Назначить цены (beta)
              </Button>
            </Col>
          </Row>
        </Flex>

      </Modal >

      <Modal
        open={isRoomlockCreationFormOpen}
        onCancel={() => setIsRoomlockCreationFormOpen(false)}
        onOk={() => setIsRoomlockCreationFormOpen(false)}
        footer={null}
      >
        <RoomlockCreationForm />
      </Modal>
    </>
  )
}

const renderEventContent = (eventInfo: EventContentArg): CustomContentGenerator<EventContentArg> => {
  return (
    // <Link className="brm-event" to={eventInfo.event.url}>
    <Button style={{ overflow: "hidden" }}>
      <Typography.Text ellipsis={true}>
        {eventInfo.event.title}
      </Typography.Text>
    </Button>
    // </Link>
  )
}

export { Calendar }

