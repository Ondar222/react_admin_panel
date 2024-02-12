import { Form, Select, SelectProps } from "antd";
import { FC } from "react";

interface IYurtaSelect extends SelectProps {
  label: string
}

const YurtaSelect: FC<IYurtaSelect> = ({ label, ...props }) => (
  <Form.Item label={label}>
    <Select
      {...props}
    >
    </Select>
  </Form.Item>
)

export { YurtaSelect }