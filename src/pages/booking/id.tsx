import { FC, useEffect } from "react"
import { MainLayout } from "../../shared/layouts/layout"
import { EBookingStatus, useBooking } from "@/entities/booking"
import { useParams } from "react-router-dom"
import { Flex, Form,Col} from "antd"
import { useHotel } from "@/entities/hotel"
import { YurtaDatePicker } from "@/shared/range-picker"
import { DetailsHeader } from "@/shared/layouts/layout/main/header"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { YurtaSelect } from "@/shared/components/form/ui/select/default"
import RoomSelect from "@/widget/room/room-select"
import { Image } from "antd/lib"
import { Avatar, Space, Card, Row } from 'antd';
import { useAccount } from "@/entities/account/api";



const style: React.CSSProperties = {  padding: '10px 0', margin: '10px 0', textAlign: "center", cursor: "not-allowed" };

const BookingDetailPage: FC = () => {
  const { id } = useParams()
  const { currentBooking, findById, update } = useBooking()
  const { hotel, setHotel } = useHotel()
  const { account, me } = useAccount()

  useEffect(() => {
    if (!account) {
      me()
    }
  })




  useEffect(() => {
    if (id) {
      setHotel()
      findById(id)
    }
  }, [])


  if (!currentBooking)
    return <div>loading</div>

  return (

    <MainLayout
      header={<DetailsHeader
        title={`#${id}`}
        onSave={() => { }}
      />
      }
      footer={<></>}
    >
      <Form layout="vertical" size="large">
        <Flex vertical gap={2}>
          <YurtaInput
            label="Идентификатор"
            disabled
            placeholder="id"
            value={currentBooking.id}
            color={"white"} />

          <YurtaInput
            label="Сумма"
            placeholder="id"
            disabled
            value={currentBooking.amount}
            color={"white"}
          />

          <YurtaSelect
            disabled
            label="Статус"
            value={currentBooking.status}
            options={Object.keys(EBookingStatus).map((status) => ({
              value: status,
              label: status
            }))}
          />

          <Card style={{borderColor: "#d9d9d9"}}>
          
            <Row gutter={[10, 20]}>
              <Col className="gutter-row" span={4}>
            
                <div>
                  <Space direction="vertical" size={4}>
                    <Space wrap size={12}>
                      <Avatar shape="circle" size={78} icon={<Image src={currentBooking.user.avatar?.link} />} />
                    </Space>
                  </Space>
                </div>
             
              </Col>
            
                
              <Col className="gutter-row" span={5}>
                <div style={style}> <p>{currentBooking.user.surname}</p></div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div style={style}><p>{currentBooking.user.name}</p></div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div style={style}> <p> {account?.phone} </p></div>
              </Col>
              <Col className="gutter-row" span={5}>
                <div style={style}> <p> {account?.email} </p></div>
              </Col>
              </Row>
            
             
            
         
          </Card>


          <YurtaInput
            label="Количество гостей"
            type="number"
            value={currentBooking.capacity}

          />

          {/* {
            booking.user &&
            <YurtaUserSelect
              value={booking.user}
              onChange={(e) => {
                setBooking((prev) => {
                  return {
                    ...prev,
                    user: e
                  }
                })
              }} />

          } */}

          {currentBooking.check_in && currentBooking.check_out &&
            <YurtaDatePicker
              label="Даты"
              value={[currentBooking.check_in, currentBooking.check_out]}
              onChange={() => { }}
            />
          }

          {
            hotel && <RoomSelect
              mode="multiple"
              value={currentBooking.rooms}

              rooms={hotel.rooms}
              isMultiple={false}
            />
          }

          {/* <Button onClick={() => {
            update(booking)
          }}>
            Сохранить
          </Button> */}
        </Flex>
      </Form>
    </MainLayout >
  )
}

export { BookingDetailPage }