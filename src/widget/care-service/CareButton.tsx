import { HeartFilled, QuestionCircleFilled } from "@ant-design/icons";
import { Button, FloatButton, Form, Input, Modal, Select } from "antd";
import axios from "axios";
import { FC, useState } from "react";

const CareButton: FC = () => {
    const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false)

    const handleClick = () => {
        setIsHelpModalOpen(true)
    }

    const handleSubmit = async () => {
        const data = await axios.post(`${import.meta.env.VITE_API}/care/help`, {
            
        })


        setIsHelpModalOpen(false)
    }

    const handleCancel = () => {

    }

    const handleOk = () => {

    }

    return (
        <>
            <FloatButton.Group>
                <FloatButton
                    icon={<QuestionCircleFilled />}
                    type="primary"
                    tooltip="Помощь по любым вопросам"
                    onClick={handleClick}
                />
            </FloatButton.Group>
            <Modal
                title="Служба заботы"
                open={isHelpModalOpen}
                onCancel={() => setIsHelpModalOpen(false)}
                onOk={() => { }}
                footer={null}
            >
                <Form.Provider onFormFinish={() => {

                }}>
                    <Form
                        method="POST"
                        layout="vertical">
                        <Form.Item label="Фамилия Имя Отчество">
                            <Input placeholder="Фамилия Имя Отчество" />
                        </Form.Item>

                        <Form.Item label="Номер телефона">
                            <Input placeholder="79ХХХХХХХХХ" />
                        </Form.Item>
                        <Form.Item label="Причина обращения">
                            <Select defaultValue={"sign_up"}>
                                <Select.Option value={"sign_up"}>
                                    Регистрация
                                </Select.Option>
                                <Select.Option value={"sign_in"}>
                                    Авторизация
                                </Select.Option>
                                <Select.Option value={"other"}>
                                    Прочее
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Отправить
                            </Button>
                        </Form.Item>
                    </Form>
                </Form.Provider>

            </Modal>
        </>


    )
}

export { CareButton }