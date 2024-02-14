import { FC, useEffect, useState } from "react";
import { useUsers } from "../../api";
import { Button, Input, Row } from "antd";

const UserSearchForm: FC = () => {
  const [search, setSearch] = useState<string>("")
  const { users, getUsers, findUserByPhone } = useUsers()

  useEffect(() => {
    findUserByPhone(search, () => {})
  }, [search])

  return (
    <Row>
      <Button onClick={() => getUsers()}>получить пользоватей</Button>
      <Input placeholder="номер пользователя" value={search} onChange={(e) => { setSearch(e.target.value) }} />

    </Row>
  )
}

export default UserSearchForm