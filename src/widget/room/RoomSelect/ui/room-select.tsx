import { FC } from "react";
import { Form, Select } from "antd";
import { IYurtaRoomSelectUI } from "../model/interface";

const YurtaRoomSelectUI: FC<IYurtaRoomSelectUI> = (props) =>
  <Select
    {...props}
    
    options={props.options}
    value={props.value}
    onChange={(e) => props.onChange(e)}
  />


export { YurtaRoomSelectUI }

