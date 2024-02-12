import { DatePicker, Form } from "antd"
import { FC } from "react"
import { IRangePickerUI } from "../model"

const RangePickerUI: FC<IRangePickerUI> = (props) =>
    <Form.Item label={props.label}>
        <DatePicker.RangePicker
            value={props.value}
            placeholder={["Дата заезда", "Дата отъезда"]}
            locale={props.locale}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
        />
    </Form.Item>

export { RangePickerUI }