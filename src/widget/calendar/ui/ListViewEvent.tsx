import { Col, Row } from "antd"
import { FC } from "react"
import { Link } from "react-router-dom"

type ListViewEventProps = {
    title: string,
    capacity: number,
    status: string,
    rooms: Array<number>,
    url: string
}

const ListViewEvent: FC<ListViewEventProps> = ({
    title,
    capacity,
    status,
    rooms,
    url
}) => {
    return (
        <Col>
            <Row style={{
                maxWidth: "100%"
            }}>
                <Col span={8}>
                    
                    {title}
                </Col>
                <Col span={13}>
                    <Row>
                        Количество гостей {
                            capacity
                        }
                    </Row>
                    <Row>
                        Забронированные номера {
                            rooms
                        }
                    </Row>
                    <Row>
                        Статус {
                            status
                        }
                    </Row>
                </Col>
                <Col span={3}>
                    <Link to={url}>Подробнее</Link>
                </Col>
            </Row>
            <Row style={{
                maxWidth: "100%"
            }}>
            </Row>
        </Col >
    )
}

export { ListViewEvent }