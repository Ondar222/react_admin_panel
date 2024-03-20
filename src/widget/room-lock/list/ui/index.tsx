import { Button, Col, Flex, List, Row, Tag } from "antd";
import { FC } from "react";
import { IRoomLockListUI } from "../model";
import { RangePickerUI } from "@/shared/range-picker/ui";
import dayjs from "dayjs";
import { IconButton } from "@/shared/components/button/action-buttons";
import { DeleteIcon } from "@/assets/icons/delete";

const RoomlockListUI: FC<IRoomLockListUI> = ({ roomlocks, onItemClick }) =>
  <List
    bordered
    header={<div style={{ position: "sticky", top: 0 }}>Активные блокировки</div>}
    itemLayout="horizontal"
    dataSource={roomlocks}
    renderItem={(item) => (
      <List.Item
        actions={[
          <IconButton
            type="text"
            icon={DeleteIcon}
            onClick={() => onItemClick(item.id)}
            key="list-loadmore-edit" />
        ]} >
        <Row gutter={[16, 16]}>
          <Col span={3}>
            <Tag>{item.id}</Tag>
          </Col>
          <Col span={15}>
            <RangePickerUI
              disabled
              defaultValue={[dayjs(item.start * 1000), dayjs(item.end * 1000)]}

              value={[dayjs(item.start * 1000), dayjs(item.end * 1000)]}
              locale={undefined} />
          </Col>
          <Col span={6}>
            <Tag>{item.status}</Tag>
          </Col>
        </Row>

      </List.Item >
    )}
    style={{
      position: "relative",
      height: "400px",
      overflow: "scroll"
    }}
  />


export { RoomlockListUI }