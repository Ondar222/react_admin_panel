import { FC, LegacyRef, useEffect, useRef, useState } from "react";
import { Booking, Room, Roomlock } from "@/entities";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import momentPlugin from "@fullcalendar/moment"
import listPlugin from '@fullcalendar/list'
import dayjs from "dayjs";
import { CalendarOptions, CustomContentGenerator, EventContentArg, EventSourceInput } from "@fullcalendar/core/index.js";
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { Button, Col, Flex, Grid, Modal, Row, Typography } from "antd";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ruLocale from '@fullcalendar/core/locales/ru';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import { ICalendar } from "../model";
import { RoomlockCreationForm } from "@/widget/roomlock/creation_form";
import { useRoomlockForm } from "@/features";
import { Link, useNavigate } from "react-router-dom";
import { ListViewEvent } from "./ListViewEvent";
import { DayGridViewEvent } from "./DayGridViewEvent";
import moment from "moment-timezone";
import { RoomlockReasonDecode } from "@/entities/roomlock/utils";
import { BookingStatusDecode } from "@/entities/booking/utils";
import { preventDefault } from "@fullcalendar/core/internal";

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"

const Calendar: FC<ICalendar> = (props) => {
  const navigate = useNavigate()
  const calendarRef: LegacyRef<FullCalendar> = useRef(null)
  const [currentView, setCurrentView] = useState<"dayGridMonth" | "list">("dayGridMonth")
  const [isDayContextMenuOpen, setIsDayContextMenuOpen] = useState<boolean>(false)
  const { isRoomlockCreationFormOpen, setIsRoomlockCreationFormOpen, dates, setDates } = useRoomlockForm()

  useEffect(() => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.on('dateClick', handleDateClick);
      calendarApi.on('eventClick', handleEventClick);

      const monthButton = document.querySelector('.fc-dayGridMonth-button');
      const dayButton = document.querySelector('.fc-list-button')

      if (monthButton) {
        monthButton.addEventListener('click', handleMonthViewClick);
      }

      if (dayButton) {
        dayButton.addEventListener('click', handleEventClick)
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
    setDates([moment(props.dateStr).unix(), moment(props.dateStr).unix()])
  }

  const handleMonthViewClick = (element) => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.changeView('dayGridMonth')
    setCurrentView('dayGridMonth')
  }

  const handleEventClick = (arg) => {
    setCurrentView('list')
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

          timeZone="Asia/Krasnoyarsk"
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
          allDayText="Весь день"
          events={props.brm.map((brm) => {

            const rooms = brm.room as Array<Room>
            if (brm.type === 'booking') {
              const booking = brm.item as Booking
              return {
                item_id: booking?.id,
                title: `Бронь №${booking?.id}`,
                capacity: booking?.capacity,
                rooms: rooms,
                status: BookingStatusDecode(booking?.status),
                start: moment(booking?.check_in * 1000).tz(tz).toISOString(),
                end: moment(booking?.check_out * 1000).tz(tz).toISOString(),
                url: `/booking/${booking?.id}`
              }
            }

            if (brm.type === 'room_lock') {
              const roomlock = brm.item as Roomlock
              return {
                item_id: roomlock.id,
                title: `Блокировка номера №${roomlock.id}`,

                rooms: rooms?.map((room) => {
                  return room.id
                }),
                status: roomlock.status,
                start: moment(roomlock.start * 1000).tz(tz).toISOString(),
                end: moment(roomlock.end * 1000).tz(tz).toISOString(),
                url: `/roomlock/${roomlock.id}`
              }
            }
          })}
          eventClick={(clickInfo) => {
            clickInfo.jsEvent.preventDefault()
            navigate(clickInfo.event.url)
          } }
          eventContent={(e) => renderEventContent(e, currentView)}
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
                  setCurrentView('list')
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

const renderEventContent = (eventInfo: EventContentArg, view: "list" | "dayGridMonth"): CustomContentGenerator<EventContentArg> => {

  if (view === "list") {
    return (
      <ListViewEvent
        title={eventInfo.event.title}
        capacity={eventInfo.event.extendedProps?.capacity}
        status={eventInfo.event.extendedProps.status}
        rooms={eventInfo.event.extendedProps?.rooms}
        url={eventInfo.event.url} />
    )
  }

  if (view === "dayGridMonth") {
    return (
      <DayGridViewEvent title={eventInfo.event.title} />
    )
  }
}

export { Calendar }
