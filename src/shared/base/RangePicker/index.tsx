import { FC, useState } from "react"
import { IRangePicker } from "./model";
import { DatePicker } from "antd";
import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { RangePickerProps } from "antd/lib/date-picker"
import locale from "antd/locale/ru_RU"

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"

const today = Date.now()

const RangePicker: FC<IRangePicker> = (props) => {
  // const { value, defaultValue, onChange, locale } = RangePickerPresenter(props)

  const [start_date, end_date] = props?.value

  const [value, setValue] = useState<RangePickerProps["value"]>([
    dayjs(start_date * 1000).tz(tz),
    dayjs(end_date * 1000).tz(tz)
  ])

  const handleChange: RangePickerProps["onChange"] = (e) => {
    const start_date = e[0].unix()
    const end_date = e[1].unix()

    console.log(props)

    setValue([e[0], e[1]])
    props.onChange([start_date, end_date])
  }

  return (
    <DatePicker.RangePicker
      {...props}
      value={value}
      placeholder={["Дата заезда", "Дата отъезда"]}
      locale={locale.DatePicker}
      defaultValue={value}
      onChange={handleChange}
    />
  )
}

export { RangePicker }