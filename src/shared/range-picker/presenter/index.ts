import locale from "antd/locale/ru_RU"


import { IRangePicker } from "../model"
import { useState } from "react"
import { RangePickerProps } from "antd/lib/date-picker"
import dayjs, { Dayjs } from "dayjs"
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)
const tz = "Asia/Krasnoyarsk"

const today = Date.now()

const RangePickerPresenter = (props: IRangePicker) => {
    const [start_date, end_date] = props.value
    const [value, setValue] = useState<[Dayjs, Dayjs]>([
        dayjs(start_date * 1000).tz(),
        dayjs(end_date * 1000).tz()
    ])

    const handleChange: RangePickerProps["onChange"] = (e) => {
        const start_date = e[0].unix()
        const end_date = e[1].unix()

        setValue([e[0], e[1]])
        props.onChange([start_date, end_date])
    }

    return {
        label: props.label,
        value: value,
        defaultValue: [dayjs(today), dayjs(today)],
        onChange: handleChange,
        locale: locale.DatePicker
    }
}

export { RangePickerPresenter }