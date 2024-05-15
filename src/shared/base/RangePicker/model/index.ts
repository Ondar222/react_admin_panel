import { RangePickerProps } from "antd/lib/date-picker"

interface IRangePicker extends Omit<RangePickerProps, "value" | "defaultValue" | "onChange"> {
    value?: [number, number]
    defaultValue?: [number, number]
    onChange?: (dates: [number, number]) => void
}

export type { IRangePicker }