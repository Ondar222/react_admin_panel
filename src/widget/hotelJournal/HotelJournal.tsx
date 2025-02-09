import { useHotel, useRoom } from "@/entities";
import {
  Card,
  Col,
  Collapse,
  Form,
  Input,
  List,
  Row,
  Tag,
  Typography,
} from "antd";
import { FC, useEffect } from "react";
import { useLoading, withLoading } from "@/processes";
import { useLogs } from "@/entities/logger/api/useLogs";
import { RangePicker } from "@/shared/base/RangePicker";
import { RoomSelect } from "@/widget";

const HotelJournal: FC = () => {
  const { hotel, getHotelDetails } = useHotel();
  const { rooms, getHotelRelatedRooms } = useRoom();
  const { setLoading } = useLoading();
  const { bookingLogs, getBookingLogs } = useLogs();

  const fetchData = async () => {
    await getHotelDetails();
    await getHotelRelatedRooms();
    await getBookingLogs();
  };

  useEffect(() => {
    withLoading(fetchData, setLoading);
  }, []);

  return (
    <List
      dataSource={bookingLogs}
      renderItem={(log) => (
        <List.Item key={log._id}>
          <Card
            title={
              <Row justify={"space-between"} gutter={[16, 16]}>
                <Col span={18}>
                  <Typography.Text ellipsis>
                    Запись в журнале №{log._id}
                  </Typography.Text>
                </Col>
                <Col span={5}>
                  <Row align={"middle"}>
                    {log.meta?.error && <Tag color="red">Ошибка</Tag>}
                    {log.meta?.success && <Tag color="green">Успешно</Tag>}
                  </Row>
                </Col>
              </Row>
            }
            style={{ width: "100%" }}
          >
            <Col>
              <Row>
                <Typography>{log.message}</Typography>
              </Row>

              <Row style={{ width: "100%" }}>
                <Collapse
                  style={{ width: "100%" }}
                  items={[
                    {
                      key: "1",
                      label: "Тело запроса",
                      children: (
                        <pre>{JSON.stringify(log.meta?.body, null, 2)}</pre>
                      ),
                    },
                    {
                      key: "2",
                      label: "Информация о запросе",
                      children: (
                        <Form layout="vertical" disabled>
                          <Form.Item>
                            <Input
                              value={
                                log.meta?.success
                                  ? log.meta.success.id
                                  : "Не присвоен"
                              }
                            />
                          </Form.Item>
                          <Form.Item label="Даты">
                            <RangePicker
                              value={[
                                log.meta?.body?.check_in,
                                log.meta?.body.check_out,
                              ]}
                            />
                          </Form.Item>

                          <Form.Item label="Номера">
                            <RoomSelect
                              mode="multiple"
                              rooms={rooms}
                              value={log.meta?.body?.rooms?.map((room) => ({
                                id: room.id,
                              }))}
                            />
                          </Form.Item>
                        </Form>
                      ),
                    },
                  ]}
                />
              </Row>
            </Col>
          </Card>
        </List.Item>
      )}
    />
  );
};

export { HotelJournal };
