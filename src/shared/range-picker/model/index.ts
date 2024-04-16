import { DatePickerProps } from "antd"
import { RangePickerProps } from "antd/lib/date-picker"
import dayjs, { Dayjs } from "dayjs"

interface IRangePicker {
    value: [number, number]
    onChange: (dates: [number, number]) => void
}

interface IRangePickerUI extends RangePickerProps {
    locale: any
    value: [Dayjs, Dayjs]
    defaultValue?: [Dayjs, Dayjs]
    onChange?: RangePickerProps["onChange"]
}

export type { IRangePicker, IRangePickerUI }