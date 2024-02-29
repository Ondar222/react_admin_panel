import React, { FC, useEffect, useState } from "react"
import { Space, Table, Divider } from 'antd';
import type { TableProps } from 'antd';
import { V2_Booking } from "@/entities/booking";
import { RoomLock } from "@/entities/room/model/interface";
import moment from "moment-timezone";
import { Link } from "react-router-dom";




const columns: TableProps<{
  type: string;
  item: V2_Booking | RoomLock;
}>['columns'] = [
    
    {
      title: 'Идентификатор',
      dataIndex: 'item',
      key: 'item',
      render: (item) => <a>{JSON.stringify(item.id)}</a>,
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
          return <a>{moment(item.check_in*1000).toString()}</a>
        }
        return <a>{moment(item.start*1000).toString()}</a>
      },
    },
    {
      title: 'Конец',
      dataIndex: 'item',
      key: 'date',
      render: (item) => {
        if (new Object(item).hasOwnProperty('check_out')) {
          return <a>{moment(item.check_out*1000).toString()}</a>
        }
        return <a>{moment(item.end*1000).toString()}</a>
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
    item: V2_Booking | RoomLock;
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
<Table  columns={columns} dataSource={props.data} />
</>
    




export { BookingList };









