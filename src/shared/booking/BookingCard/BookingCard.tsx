import { FC } from "react"
import { Booking } from "@/entities"
import { Button, Card, Collapse, Flex, Image, Tag, Typography } from "antd"
import { EditIcon } from "@/assets/icons/edit"
import { DeleteIcon } from "@/assets/icons/delete"
import moment from "moment"
import { convertToMoneyString } from "@/shared/utils/converters/toMoney"
import { Link } from "react-router-dom"

const BookingCardUI: FC<Booking> = (booking) => {
  const { Panel } = Collapse
  const { Text } = Typography

  return (
    <Card
      title={
        <Flex
          justify="space-between"
          align="center"
        >
          Бронь №{booking?.id}
          <Flex justify={"space-between"}>
            <Tag>{moment(booking?.check_in).date()}</Tag>
            <Tag>{booking?.status}</Tag>
          </Flex>
        </Flex>
      }
      actions={[
        <Button icon={<DeleteIcon />}></Button>,
        <Link to={`/booking/${booking?.id}`}>
          <Button icon={<EditIcon />}></Button>
        </Link>
      ]}
    >
      {
        typeof booking?.user === "object" &&
        <Collapse style={{ borderRadius: 0 }} items={[
          {
            key: 1,
            label: "Информация о госте",
            children: (
              <div>
                <Text>Имя: {booking?.user?.name}</Text>
                <Text>Фамилия: {booking?.user?.surname}</Text>
                <Text>Номер телефона: {booking?.user?.phone}</Text>
                <Text>Электронная почта: {booking?.user?.email}</Text>
              </div>
            )
          },
          {
            key: 2,
            label: "Информация об оплате",
            children: (
              <div>
                <Text>Статус: <Tag>{booking?.status}</Tag></Text>
                <Text>Сумма: {convertToMoneyString(booking?.amount)}</Text>
              </div>
            )
          },
          {
            key: 3,
            label: "Информация о времени пребывания",
            children: (
              <div>
                <Text>
                  Заезд: {moment(booking?.check_in).toDate().toDateString()}
                </Text>
                <Text>
                  Отъезд: {moment(booking?.check_out).toDate().toDateString()}
                </Text>
              </div>
            )
          },
          {
            key: 4,
            label: "Информация о номере",
            children: (
              <Flex>
                <Image src={booking?.rooms[0]?.cover?.link} width={50} height={50} />
                <Flex vertical>
                  <Text>
                    {
                      booking?.rooms[0]?.type
                    }
                  </Text>
                  <Text>
                    {
                      booking?.rooms[0]?.number
                    }
                  </Text>
                </Flex>
              </Flex>
            )
          }
        ]} />
      }
    </Card >
  )
}

export { BookingCardUI }