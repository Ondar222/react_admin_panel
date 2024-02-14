import { Typography, Select, Form } from "antd"
import { FC } from "react"

export const LockReasonSelect: FC<any> = (props) => {
  return (
    <LockReasonSelectUI onChange={props.onChange} />
  )
}

const LockReasonSelectUI: FC<any> = (props) =>
  <Form.Item
    label={
      <Typography.Title
        level={4}>
        Добавить событие
      </Typography.Title>
    }>
    <Select onChange={props.onChange}>
      <option value={"repair"}>Ремонт</option>
      <option value={"offline"}>Оффлайн заказ</option>
      <option value={"other"}>Еще одна причина</option>
    </Select>
  </Form.Item>
