import { ICalendar } from "@/entities/calendar"
import { CalendarUI } from "./calendar/ui"
import { CalendarDrawerUI } from "./drawer/ui/drawer"
import { CalendarModalUI } from "./modal/ui/modal"
import { FC } from "react"
import { CalendarPresenter } from "./calendar/presenter"

const CalendarWidget: FC = ({ calendar }: { calendar: ICalendar[] }) => {

  const { cellRender } = CalendarPresenter(calendar)
  // drawer presenter
  // modal presenter

  return (
    <>
      <CalendarUI
        cellRender={cellRender}
        onSelect={(date, info) => {
          console.log(date)
          console.log(info)
        }}
      />
      <CalendarDrawerUI />
      <CalendarModalUI />
    </>
  )
}

export { CalendarWidget }