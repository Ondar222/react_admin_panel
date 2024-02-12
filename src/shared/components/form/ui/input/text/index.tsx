import { Form, Input, InputProps } from "antd"
import { FC } from "react"

interface IYurtaInput extends InputProps {
  label: string
}

const YurtaInput: FC<IYurtaInput> = (props) => {
  return (
    <Form.Item label={props.label}>
      <Input {...props} />
    </Form.Item>
  )
}

export { YurtaInput }