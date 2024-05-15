import { Button, Col, List, Row, Tag } from "antd";
import { FC } from "react";
import { IRoomLockListUI } from "../model";
import { RangePicker } from "@/shared/base/RangePicker";
import dayjs from "dayjs";
import { DeleteIcon } from "@/assets/icons/delete";
import { DeleteFilled } from "@ant-design/icons";
import { RoomlockReasonDecode } from "@/entities/roomlock/utils";

const RoomlockList: FC<IRoomLockListUI> = ({ roomlocks, onItemClick }) =>
  <List
    bordered
    header={<div style={{ position: "sticky", top: 0 }}>Активные блокировки</div>}
    itemLayout="horizontal"
    dataSource={roomlocks}
    renderItem={(item) => (
      <List.Item style={{ width: "100%" }}>
        <Row
          gutter={[16, 16]}
          justify={"space-between"}
          align={"middle"}
          style={{ width: "100%" }}
        >
          <Col span={3}>
            <Tag>{item.id}</Tag>
          </Col>
          <Col span={12}>
            <RangePicker
              disabled
              value={[item.start, item.end]}
              defaultValue={[item.start, item.end]}
              locale={undefined} />
          </Col>
          <Col span={6}>
            <Tag>{RoomlockReasonDecode(item.status)}</Tag>
          </Col>
          <Col span={3}>
            <Button
              type="text"
              icon={<DeleteFilled />}
              onClick={() => onItemClick(item.id)}
              key="list-loadmore-edit" />
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


export { RoomlockList }