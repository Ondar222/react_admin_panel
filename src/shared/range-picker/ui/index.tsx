import { DatePicker, Form } from "antd"
import { FC } from "react"
import { IRangePickerUI } from "../model"

const RangePickerUI: FC<IRangePickerUI> = (props) =>
    props.label ? <Form.Item label={props.label}>
        <DatePicker.RangePicker
            value={props.value}
            placeholder={["Дата заезда", "Дата отъезда"]}
            locale={props.locale}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            {...props}
        />
    </Form.Item>
        :
        <DatePicker.RangePicker
            value={props.value}
            placeholder={["Дата заезда", "Дата отъезда"]}
            locale={props.locale}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            {...props}
        />


export { RangePickerUI }