import { Button, Flex, Form, Input, Modal, Row, Select } from "antd";
import { FC, useEffect, useState } from "react";
// import { debounce } from "lodash";
import { useCredentails } from "@/features/auth";
import axios from "axios";
import { DirectusUserResponse } from "@/entities/user/model/decoder";
import { ApiResponse } from "@/app/types";

interface IUserSelect {
  value: string
  onChange: (e: string) => void
}

let timeout: ReturnType<typeof setTimeout> | null;
let currentValue: string;

const YurtaUserSelect: FC<IUserSelect> = ({ value, onChange }) => {
  const [state, setState] = useState<string>(value)
  const [users, setUsers] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { access_token } = useCredentails()

  function findUserByPhone(phone: string, callback: Function) {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }

    currentValue = phone
    const getUsers = () => {
      axios.get<ApiResponse<DirectusUserResponse[]>>(
        `${import.meta.env.VITE_API}/user/findManyByPhone?phone=${phone}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
        .then((res) => res.data.data)
        .then((res) => {
          if (currentValue === phone) {
            const result = res;
            const data = result?.map((item: any) => ({
              value: item.id,
              text: `${item.surname} ${item.name} ${item.phone} `,
            }));
            callback(data);
          }
        });
    }
    if (phone) {
      timeout = setTimeout(getUsers, 300);
    } else {
      callback([]);
    }
  }

  const handleChange = (user: string) => {
    setState(user);
    onChange(user)
  };

  const handleSearch = (query: string) => {
    findUserByPhone(query, setUsers)
  }

  // const debounceHandleSearch = useCallback(
  //   debounce(handleSearch, 500), []
  // )

  return (
    <Form.Item label="Гость">
      <Select
        placeholder="Введите номер"
        showSearch
        // disabled
        // searchValue={userSearch}
        autoClearSearchValue
        onSearch={handleSearch}
        onChange={(e: string) => {
          handleChange(e)
          onChange(e)
        }}
        value={state}
        options={(users || []).map((user: any) => ({
          value: user.value,
          label: user.text
        }))}
        optionRender={(option) => {
          return <Row>{option.label}</Row>
        }}
        notFoundContent={
          <Row>
            <Button onClick={() => setIsModalOpen(true)}>Зарегистрировать</Button>
          </Row>
          }
        filterOption={false}
        defaultActiveFirstOption={false}

      />
      <YurtaCreateUserModal
        open={isModalOpen}
        onOk={(e) => { }}
        onCancel={(e) => { setIsModalOpen(false) }}
      />
    </Form.Item>
  )
}

interface IYurtaCreateUserModal {
  open: boolean,
  onOk: (e: React.MouseEvent<HTMLButtonElement>) => void
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const YurtaCreateUserModal: FC<IYurtaCreateUserModal> = ({ open, onOk, onCancel }) => {
  const [userSignUp, setUserSignUp] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(300)

  useEffect(() => {
    if (userSignUp === true) {
      setTimeout(() => {
        setTimer((prev) => prev - 1)
        console.log(timer)
      }, 1000)
    }
  }, [userSignUp])

  useEffect(() => {
    if (userSignUp === true) {
      setTimeout(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
  }, [timer])

  return (
    <Modal
      title="Регистрация пользователя"
      open={open}
      onOk={(e) => {
        onOk(e)
        setUserSignUp(true)
      }}
      onCancel={(e) => {
        onCancel(e)
      }}
      okText="Зарегистрировать"
      cancelText="Отмена"
    >
      <Flex gap={"middle"} vertical>
        <Input placeholder="Имя" />
        <Input placeholder="Фамилия" />
        <Input placeholder="Номер" />
        <Input placeholder="Адрес электронной почты" />
        {
          userSignUp && (
            <>
              <Form layout="vertical">
                <Form.Item label="Верификаонный код">
                  <Input placeholder="000000" />
                </Form.Item>
              </Form>
              {timer}
            </>
          )
        }
      </Flex>
    </Modal>
  )
}

export { YurtaUserSelect }