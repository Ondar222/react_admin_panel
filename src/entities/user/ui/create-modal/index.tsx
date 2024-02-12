import { Modal } from "antd";
import { FC, useState } from "react";
import { IUserCreateModal } from "./interface";

const UserCreateModal: FC<IUserCreateModal> = ({ onOk }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Modal
      title="Регистрация пользователя"
      open={isOpen}
      onOk={() => {
        onOk()
      }}
      onCancel={() => setIsOpen(false)}
    >

    </Modal>
  )
}

export { UserCreateModal }