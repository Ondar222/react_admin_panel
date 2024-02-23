import React, { FC, useEffect, useState } from "react"
import { Button, Flex, Space, Table, Tag, Typography, Col, Row, Divider, Card } from 'antd';
import { useBooking } from "@/entities/booking";
import { useBrm } from "@/entities/calendar/api/useBrm"
import { V2_Booking } from "@/entities/booking";
import { RoomLock } from "@/entities/room/model/interface";



const BookingBrickUI: React.FC<any> = (props) =>{
  const { booking, findAll } = useBooking()
  
  const { brm, getAll } = useBrm()

  useEffect(() => {
    findAll()
    getAll()
  }, [])
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
  

  

return (

<>
<Row className="container_brick" gutter={16}>
    <Col span={8}>
      <Card bordered={false}>
      <a>{JSON.stringify(brm)}</a>,
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
      <p>Идентификатор</p>
       <p>Типы</p>
       <p>Начало</p>
       <p>Конец</p>
       <p>Статус</p>
      </Card>
    </Col>
    <Col span={8}>
      <Card  bordered={false}>
      <p>Идентификатор</p>
       <p>Типы</p>
       <p>Начало</p>
       <p>Конец</p>
       <p>Статус</p>
      </Card>
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={8}>
      <Card bordered={false}>
      <p>Идентификатор</p>
       <p>Типы</p>
       <p>Начало</p>
       <p>Конец</p>
       <p>Статус</p>
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
      <p>Идентификатор</p>
       <p>Типы</p>
       <p>Начало</p>
       <p>Конец</p>
       <p>Статус</p>
      </Card>
    </Col>
    <Col span={8}>
      <Card bordered={false}>
      <p>Идентификатор</p>
       <p>Типы</p>
       <p>Начало</p>
       <p>Конец</p>
       <p>Статус</p>
      </Card>
    </Col>
  </Row>
</>
)
}




export { BookingBrickUI };


