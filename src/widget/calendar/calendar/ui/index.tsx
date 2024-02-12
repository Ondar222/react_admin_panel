import { useCalendar } from "@/entities/calendar";
import { FC, useCallback, useEffect } from "react";
import type { Dayjs } from "dayjs"
import type { CalendarProps } from "antd"
import { Calendar } from "antd";
import dayjs from "dayjs";
import locale from "antd/lib/calendar/locale/ru_RU"
import 'dayjs/locale/ru'
import { useNavigate } from "react-router-dom";

const CalendarUI: FC<CalendarProps<Dayjs>> = (props) => {
  const { calendar, getAll } = useCalendar()
  const navigate = useNavigate()

  useEffect(() => {
    getAll()
  }, [])

  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const getListData = useCallback((value: Dayjs) => {
    let listData: { content: string, status: string }[] = [];

    const data = calendar.find((day) => {
      return (
        value.date() === dayjs(day.date).date() &&
        value.month() === dayjs(day.date).month() &&
        value.year() === dayjs(day.date).year()
      )

    })

    data?.brm.forEach((brm) => {
      if (brm.booking) {
        listData.push({
          status: brm.status,
          content: String().concat('booking', String(brm?.booking?.id)),
        })
      }
      if (brm.lock) {
        listData.push({
          status: brm.status,
          content: String().concat('lock', String(brm?.lock?.id), brm.status),
        })
      }

    })

    return listData || [];
  }, [calendar]);

  const monthCellRender = useCallback((value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }, [calendar]);

  const dateCellRender = useCallback((value: Dayjs) => {
    const listData = getListData(value);

    return (
      <ul className="events" style={{
        display: 'flex',
        flexDirection: "column",
        justifyContent: "start"
      }}>
        {
          listData.map((item) => {
            return (
              <li key={item.content} style={{
                listStyle: 'none',
                background: 'purple',
                borderBottom: 'white 1px solid',
                margin: 0,
                padding: 0,
                color: 'white'
              }}>
                {item.content}
              </li>
            )
          })
        }
      </ul>
    );
  }, [calendar]);

  return (
    <Calendar
      fullscreen
      rootClassName="anyclass"
      locale={locale}
      cellRender={props.cellRender}
      onSelect={props.onSelect}
    />

  )
}

export { CalendarUI }