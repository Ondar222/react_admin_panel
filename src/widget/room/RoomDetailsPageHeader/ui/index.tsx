import { Room } from "@/entities"
import { RoomDeleteButton, RoomVisibilitySwitcher } from "@/shared"
import { Flex, Typography, Row, Col } from "antd"
import { FC } from "react"

export const RoomDtlsPgHdr: FC<{ room: Room }> = ({ room }) =>
    <RoomDtlsPgHdrUI room={room} />


const RoomDtlsPgHdrUI: FC<{ room: Room }> = (props) =>
    <Flex justify="space-between" align="center">
        <Typography.Title level={3}>
            Номер #{props?.room?.id} {props?.room?.name}
        </Typography.Title>

        <Row
            gutter={[16, 16]}
            align={"middle"}
        >
            <Col>
                <RoomDeleteButton id={props?.room?.id} />
            </Col>
            <Col>
                <Row gutter={[16, 16]}>
                    <Col>
                        <RoomVisibilitySwitcher room={props?.room} />
                    </Col>
                    <Col>
                        <Typography.Text>Показывать в поиске</Typography.Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Flex>