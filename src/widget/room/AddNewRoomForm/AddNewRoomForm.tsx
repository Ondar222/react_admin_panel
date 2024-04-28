import { FC, useRef, useState } from "react";
import { Button, Col, Form, Input, Select, Upload, message } from "antd";
import type { FormProviderProps } from "antd/es/form/context";
import type { UploadChangeParam } from "antd/es/upload";
import { Room, RoomCreationDto, RoomTypes, useRoom } from "@/entities";
import { YurtaEditor } from "@/shared/editor";
import { validateNumberInputValue } from "@/shared/utils/form/validation";
import { AxiosError } from "axios";
import { useLoading, withLoading } from "@/processes";
import { Tooltip, Space, Row, TourProps, Tour } from "antd";
import { MoneyInput } from "@/shared/base/MoneyInput";

interface AddNewRoomFormProps {
  hotel_id: number;
  successCallback: (data: Room) => void;
  rejectCallback: (error: Error | AxiosError) => void;
}

const ROOM_TYPES_OPTIONS = Object.keys(RoomTypes).map((status) => ({
  value: status,
  label: RoomTypes[status],
}));

const AddNewRoomForm: FC<AddNewRoomFormProps> = ({
  hotel_id,
  successCallback,
  rejectCallback,
}) => {
  const { createRoom, getHotelRelatedRooms } = useRoom();
  const { setLoading } = useLoading();

  const colors = ["blue"];

  const [form] = Form.useForm<RoomCreationDto>();

  const name = Form.useWatch("name", form);
  const number = Form.useWatch("number", form);
  const price = Form.useWatch<number>("price", form);
  const description = Form.useWatch("description", form);
  const capacity = Form.useWatch("capacity", form);
  const type = Form.useWatch<RoomTypes>("type", form);
  const cover = Form.useWatch<UploadChangeParam>("cover", form);
  const images = Form.useWatch<UploadChangeParam>("images", form);

  const createRoomWithLoading = async () => {
    await createRoom({
      name,
      number,
      price: price,
      type,
      capacity,
      description,
      cover: cover.fileList,
      images: images.fileList,
      hotel_id,
      visibility: false,
    })
      .then((res) => {
        message.success("Успешно создан новый номер");
        getHotelRelatedRooms();
        successCallback(res);
      })
      .catch((e) => {
        message.error("Ошибка при создании номера");
        rejectCallback(e);
        throw e;
      });
  };

  const handleSubmit: FormProviderProps["onFormFinish"] = async (
    form_name,
    info
  ) => {
    if (form_name === "room_creation") {
      withLoading(createRoomWithLoading, setLoading);
    }
  };

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const ref8 = useRef(null);
  const ref9 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Шаг 1",
      description: "Введите название вашего номера",
      placement: "right",
      target: () => ref1.current,
    },
    {
      title: "Шаг 2",
      description: "ID номер",
      placement: "right",
      target: () => ref2.current,
    },
    {
      title: "Шаг 3",
      description: "Укажите стоимость номера в рублях",
      placement: "right",
      target: () => ref3.current,
    },
    {
      title: "Шаг 4",
      description: "Тип номера: Эконом/Стандарт/Люкс",
      placement: "right",
      target: () => ref4.current,
    },
    {
      title: "Шаг 5",
      description: "Вместимость номера",
      placement: "right",
      target: () => ref5.current,
    },

    {
      title: "Шаг 6",
      description: "Опишите номер подробно",
      placement: "right",
      target: () => ref6.current,
    },
    {
      title: "Шаг 7",
      description: "Добавьте обложку номера",
      placement: "right",
      target: () => ref7.current,
    },
    {
      title: "Шаг 8",
      description: "Добавьте изображение номера",
      placement: "right",
      target: () => ref8.current,
    },
    {
      title: "Шаг 9",
      description: "Поздравляю! Нажмите 'Создать' ",
      placement: "right",
      target: () => ref9.current,
    },
  ];

  return (
    <Col
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Row style={{ width: "100%" }}>
        <Form.Provider onFormFinish={handleSubmit}>
          <Form form={form} name="room_creation" layout="vertical" size="large">
            <Col ref={ref1}>
              <Form.Item
                name={"name"}
                label="Название номера"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col ref={ref2}>
              <Form.Item
                name={"number"}
                label="Идентификатор номера"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col ref={ref3}>
              <Form.Item
                name="price"
                label="Стоимость"
                rules={[
                  {
                    required: true,
                    validator: validateNumberInputValue,
                  },
                ]}
              >
                <MoneyInput
                  onChange={(e) => {
                    const price = Number(e.target.value) * 100
                    form.setFieldValue('price', price)
                  }} />
              </Form.Item>
            </Col>
            <Col ref={ref4}>
              <Form.Item name={"type"} label="Тип номера" rules={[]}>
                <Select options={ROOM_TYPES_OPTIONS} />
              </Form.Item>
            </Col>
            <Col ref={ref5}>
              <Form.Item
                name={"capacity"}
                label="Вместимость"
                rules={[
                  {
                    required: true,
                    type: "number",
                    validator: validateNumberInputValue,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col ref={ref6}>
              <Form.Item
                name={"description"}
                label="Описание номера"
                rules={[{ required: true }]}
              >
                <YurtaEditor />
              </Form.Item>
            </Col>
            <Col ref={ref7}>
              <Form.Item
                name={"cover"}
                label="Обложка"
                rules={[{ required: true }]}
              >
                <Upload
                  maxCount={1}
                  listType="picture-card"
                  beforeUpload={() => false}
                >
                  <Space wrap>
                    {colors.map((color) => (
                      <Tooltip
                        title="Загрузите фото обложки"
                        color={color}
                        key={color}
                      >
                        Загрузить
                      </Tooltip>
                    ))}
                  </Space>
                </Upload>
              </Form.Item>
            </Col>
            <Col ref={ref8}>
              <Form.Item
                name={"images"}
                label="Изображения"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Upload
                  maxCount={10}
                  multiple={true}
                  listType="picture-card"
                  beforeUpload={() => false}
                >
                  <Space wrap>
                    {colors.map((color) => (
                      <Tooltip
                        title="Загрузите изображение"
                        color={color}
                        key={color}
                      >
                        Загрузить
                      </Tooltip>
                    ))}
                  </Space>
                </Upload>
              </Form.Item>
            </Col>
            <Col ref={ref9}>
              <Form.Item>
                <Button htmlType="submit">Создать</Button>
              </Form.Item>
            </Col>
          </Form>
        </Form.Provider>
      </Row>
      <Row
        style={{
          display: "flex",
          width: "80%",
          position: "fixed",
          justifyContent: "end",
          bottom: "20px",
        }}
      >
        <Col style={{ display: "flex", flexDirection: "column" }}>
          <Button type="primary" onClick={() => setOpen(true)}>
            ?
          </Button>
          <Tour
            open={open}
            onClose={() => setOpen(false)}
            mask={false}
            type="primary"
            steps={steps}
          />
        </Col>
      </Row>
    </Col>
  );
};

export { AddNewRoomForm };
