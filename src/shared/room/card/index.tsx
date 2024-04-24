import { FC } from "react";
import { Room, useRoom } from "../../../entities/room";
import { Card, Col, Flex, Row, Switch, Typography, Image } from "antd";
import { EditIcon } from "@/assets/icons/edit";
import { IconButton } from "@/shared/components/button/action-buttons";
import { Link } from "react-router-dom";
import { RoomVsbltSwitch } from "../visibility_switch";
import { convertToMoneyString } from "@/shared/utils/converters/toMoney";
import { convertToRoomTypesString } from "@/shared/utils/converters/toRoomTypesString";
import {
  Button,
  Divider,
  Space,
  Tooltip,
  ConfigProvider,
  Segmented,
} from "antd";


const colors = ["blue"];

const RoomCardUI: FC<Room> = (room) => (
  <Card
    title={
      <Typography.Title level={4} ellipsis>
        {room.name}
      </Typography.Title>
    }
    actions={[
      <Link to={`/room/${room.id}`}>
        <Space wrap>
          {colors.map((color) => (
            <Tooltip placement="bottom" title="Редактировать">
              <Button type="text">
                <IconButton icon={EditIcon} />
              </Button>
            </Tooltip>
          ))}
        </Space>
      </Link>,
      <RoomVsbltSwitch room={room} />,
    ]}
  >
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Image
          src={room?.cover?.id != null ? room.cover.link : "/vite.svg"}
          height={100}
          width={"100%"}
          style={{
            borderRadius: 8,
            objectFit: "cover",
          }}
        />
      </Col>
      <Col span={12}>
        <Row>
          <Typography.Text ellipsis>
            Цена: {convertToMoneyString(room.price)}
          </Typography.Text>
        </Row>
        <Row>
          <Typography.Text ellipsis>
            Тип: {convertToRoomTypesString(room.type)}
          </Typography.Text>
        </Row>
        <Row>
          <Typography.Text ellipsis>Номер: {room.number}</Typography.Text>
        </Row>
        <Row>
          <Typography.Text ellipsis>
            Вместимость: {room.capacity}
          </Typography.Text>
        </Row>
      </Col>
    </Row>
  </Card>
);

export default RoomCardUI;
