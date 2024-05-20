import React, { FC } from "react";
import { Col, Typography, Collapse, Form, Input, DatePicker,Flex } from "antd";
import { RoomlockReasonDecode } from "@/entities/roomlock/utils"
import { RoomSelect } from "@/widget";

interface LogDetailsProps {
  log: any; // тип данных лога
  rooms: any[]; // массив комнат
}

const LogDetails: FC<LogDetailsProps> = ({ log, rooms }) => {
  return (
    <Col>
      <Flex vertical gap={10}>
        <Typography>
          Сообщение: Администратор {log.message}
        </Typography>

        <Collapse
          size="small"
          bordered={false}
          items={[
            {
              key: '1',
              label: "Тело запроса",
              children: <pre>{JSON.stringify(log?.meta?.body, null, 2)}</pre>
            },
            {
              key: '2',
              label: "Информация о запросе",
              children:
                <Form layout="vertical" disabled>
                  <Form.Item>
                    <Input value={log.meta.success ? log.meta.success.id : "Не присвоен"} />
                  </Form.Item>
                  <Form.Item label="Даты">
                    <DatePicker.RangePicker value={[log.meta.body.start, log.meta.body.end]} />
                  </Form.Item>
                  <Form.Item label="Номера">
                    <RoomSelect rooms={rooms} value={{ id: log.meta.body.id }} />
                  </Form.Item>
                  <Form.Item label="Причина">
                    <Input value={RoomlockReasonDecode(log.meta.body.reason)} />
                  </Form.Item>
                </Form>
            }
          ]}
        />
      </Flex>
    </Col>
  );
};

export { LogDetails };
