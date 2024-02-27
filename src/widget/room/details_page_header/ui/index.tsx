import { Room, useRoom } from "@/entities/room"
import id from "@/pages/hotel/id"
import { RoomDeleteButton } from "@/shared/room/delete_buttom"
import { RoomVsbltSwitch } from "@/shared/room/visibility_switch"
import { Flex, Typography, Row, Col, Button, Switch } from "antd"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

export const RoomDtlsPgHdr: FC<{ room: Room }> = ({ room }) =>
    <RoomDtlsPgHdrUI room={room} />


const RoomDtlsPgHdrUI: FC<{ room: Room }> = (props) =>
    <Flex justify="space-between" align="center">
        <Typography.Title level={3}>
            Номер #{props?.room?.id} {props?.room?.name}
        </Typography.Title>

        <Row gutter={[16, 16]}>
            <Col>
                <RoomDeleteButton id={props?.room?.id} />
            </Col>

            <Col>
                <RoomVsbltSwitch room={props?.room} />
            </Col>

            <Col>
                <Typography.Text>Показывать в поиске</Typography.Text>
            </Col>
        </Row>
    </Flex>