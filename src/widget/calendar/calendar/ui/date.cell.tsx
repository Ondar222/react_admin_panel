import { FC } from "react";
import { IDateCellUI } from "../model/interface";
import { List } from "antd";

const DateCellUI: FC<IDateCellUI> = ({ items }) =>
  <List>
    {items.map((item: string) => <DateCellUIListItem data={item} />)}
  </List>

const DateCellUIListItem: FC<{ data: string }> = ({ data }) => <List.Item>{data}</List.Item>


export { DateCellUI }