import { FC } from "react";
import { Form, Select } from "antd";
import { IYurtaRoomSelectUI } from "../model/interface";

const YurtaRoomSelectUI: FC<IYurtaRoomSelectUI> = (props) =>
  <Form.Item label="Номера">
    <Select
      mode="multiple"
      options={props.options}
      value={props.value}
      onChange={(e) => props.onChange(e)}
    />
  </Form.Item>


export { YurtaRoomSelectUI }

