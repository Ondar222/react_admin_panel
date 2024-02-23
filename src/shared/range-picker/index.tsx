import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react"
import { RangePickerUI } from "./ui";
import { RangePickerPresenter } from "./presenter";
import { IRangePicker } from "./model";

const YurtaDatePicker: FC<IRangePicker> = (props) => {
  const { label, value, defaultValue, onChange, locale } = RangePickerPresenter(props)

  return (
    <RangePickerUI
      label={label}
      value={value}
      defaultValue={value}
      onChange={onChange}
      locale={locale} />
  )
}

export { YurtaDatePicker }