import { Typography, Select, Form } from "antd"
import { FC } from "react"

export const LockReasonSelect: FC<any> = (props) => {
  return (
    <LockReasonSelectUI onChange={props.onChange} />
  )
}

const LockReasonSelectUI: FC<any> = (props) =>
  <Form.Item
    label={<Typography.Title
      level={4}>
      Добавить событие
    </Typography.Title>}
  >
    <Select onChange={props.onChange}>
      <Select.Option value={"repair"}>Ремонт</Select.Option>
      <Select.Option value={"offline"}>Оффлайн заказ</Select.Option>
      <Select.Option value={"other"}>Еще одна причина</Select.Option>
    </Select>
  </Form.Item>
