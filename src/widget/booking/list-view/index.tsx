import { FC, useEffect, useState } from "react"
import { Space, Table, Divider } from 'antd';
import type { TableProps } from 'antd';
import { Booking } from "@/entities/booking";
import { Roomlock } from "@/entities/roomlock";
import { Link } from "react-router-dom";
import dayjs from "dayjs";




const columns: TableProps<{
  type: string;
  item: Booking | Roomlock;
}>['columns'] = [

    {
      title: 'Идентификатор',
      dataIndex: 'item',
      key: 'item',
      render: (item) => <a>{item.id}</a>,
    },
    {
      title: 'Типы',
      dataIndex: 'type',
      key: 'type',
      render: (item) => <a>{item}</a>,
    },
    {
      title: 'Начало',
      dataIndex: 'item',
      key: 'date',
      render: (item) => {
        if (new Object(item).hasOwnProperty('check_in')) {
          return <a>{dayjs(item.check_in * 1000).toString()}</a>
        }
        return <a>{dayjs(item.start * 1000).toString()}</a>
      },
    },
    {
      title: 'Конец',
      dataIndex: 'item',
      key: 'date',
      render: (item) => {
        if (new Object(item).hasOwnProperty('check_out')) {
          return <a>{dayjs(item.check_out * 1000).toString()}</a>
        }
        return <a>{dayjs(item.end * 1000).toString()}</a>
      },
    },
    {
      title: 'Статус',
      dataIndex: 'item',
      key: 'date',
      render: (item) => <a>{item.status}</a>,
    },
    {

      render: (_, record) => (
        <Space size="middle" style={{ background: "#7B68EE", width: "75px", display: "flex", justifyContent: "center", borderRadius: "0.1rem" }}>
          <Link style={{ color: "#fff" }} to={`/booking/${record.item.id}`}>Изменить</Link>
        </Space>
      ),
    },
  ];

const BookingList: FC<any> = (props) => {
  const data = useBookingList(props.data)

  return <BookingListUI data={props.data} />
}


const useBookingList = (props) => {
  const [data, setData] = useState<{
    type: string;
    item: Booking | Roomlock;
  }[]>([])

  useEffect(() => {
    setData(props.brm)
  }, [])

  useEffect(() => {
    setData(props.brm)
  }, [props.brm])

  return data
}

const BookingListUI: FC<any> = (props) =>

  <>
    <Divider />
    <Table columns={columns} dataSource={props.data} />
  </>





export { BookingList };
