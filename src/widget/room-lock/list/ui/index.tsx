import { Button, Flex, List, Tag } from "antd";
import { FC } from "react";
import { IRoomLockListUI } from "../model";
import { RangePickerUI } from "@/shared/range-picker/ui";
import dayjs from "dayjs";

const RoomLockListUI: FC<IRoomLockListUI> = ({ room_locks }) =>
  <List
    className="demo-loadmore-list"
    itemLayout="horizontal"
    dataSource={room_locks}
    renderItem={(item) => (
      <List.Item
        actions={[<Button key="list-loadmore-edit">Удалить</Button>]}
      >
        <Flex vertical={false} justify={"space-between"} align={"center"}>
          <Tag>{item.id}</Tag>

          <RangePickerUI
            disabled
            defaultValue={[dayjs(item.start * 1000), dayjs(item.end * 1000)]}

            value={[dayjs(item.start * 1000), dayjs(item.end * 1000)]}
            locale={undefined} />


          <Tag>{item.status}</Tag>
        </Flex>

      </List.Item>
    )}
  />


export { RoomLockListUI }