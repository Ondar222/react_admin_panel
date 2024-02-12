import { Dayjs } from "dayjs";
import { ICalendar, ICalendarPresenter } from "../model/interface";
import dayjs from "dayjs";
import { DateCellUI } from "../ui/date.cell";

const CalendarPresenter = (calendar: ICalendar[]): ICalendarPresenter => {
  function combineListData(current: Dayjs) {
    let listData: { content: string; status: string }[] = [];

    const data = calendar.find((day) => {
      return (
        current.date() === dayjs(day.date).date() &&
        current.month() === dayjs(day.date).month() &&
        current.year() === dayjs(day.date).year()
      );
    });

    data?.brm.forEach((brm) => {
      if (brm.booking) {
        listData.push({
          status: brm.status,
          content: String().concat("booking", String(brm?.booking?.id)),
        });
      }
      if (brm.lock) {
        listData.push({
          status: brm.status,
          content: String().concat("lock", String(brm?.lock?.id), brm.status),
        });
      }
    });

    return listData || [];
  }

  function monthCellRender(current: Dayjs) {}

  function dateCellRender(current_date: Dayjs) {
    const data = combineListData(current_date);
    return DateCellUI({
      items: data,
      label: "any label",
      onClick: handleDateCellClick,
    });
  }

  function cellRender(current: Dayjs, info: any) {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  }

  function handleSelect() {}
  function handleChange() {}

  function handleDateCellClick() {}

  return {
    cellRender,
    dateCellRender,
    monthCellRender,
    onSelect: handleSelect,
    onChange: handleChange,
  };
};

export { CalendarPresenter };
