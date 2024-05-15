import { Typography, Select, Form } from "antd"
import { FC } from "react"

export const LockReasonSelect: FC<any> = (props) => {
  return (
      <Select onChange={props.onChange} defaultValue={"repair"}>
        <Select.Option value={"repair"}>Ремонт</Select.Option>
        <Select.Option value={"offline"}>Оффлайн заказ</Select.Option>
        <Select.Option value={"other"}>Еще одна причина</Select.Option>
      </Select>
  )
}
