import React, { useState, FC } from 'react';
import { Row, Col, Typography, Card, Space, Button, Carousel,  UploadFile,  } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/shared/layouts/layout';
import { HotelUpdateDto, useHotel } from '@/entities';
import { HotelUpdatePageProps, UpdateHotelFormT } from '@/widget/hotel/form/UpdateHotelForm/model';

export const HotelsPageHeader: FC<HotelUpdatePageProps> = (props) => {
  const [hotel, setHotel] = useState<HotelUpdateDto>(new HotelUpdateDto(props.hotel))
  const [cover, setCover] = useState<Array<UploadFile>>([{
    uid: props.hotel?.cover?.id,
    name: props.hotel?.cover?.id,
    url: props.hotel?.cover?.link,
    thumbUrl: props.hotel?.cover?.link
  }])
  const [images, setImages] = useState<Array<UploadFile>>(
    () => {
      if (props?.hotel?.images === null) {
        return []
      }

      return props.hotel?.images?.map((file) => ({
        uid: file?.id,
        name: file?.id,
        url: file?.link,
        thumbUrl: file?.link
      }))
    }
  )


  const { updateHotel, deleteImage } = useHotel()

  


  const navigate = useNavigate();
  return (
    <Row justify="space-between">
      <Col>
        <Typography.Title level={2}>Отели</Typography.Title>
      </Col>
      <Col>
        <Button onClick={() => navigate("/hotels/+")}>Создать отель</Button>
      </Col>
    </Row>
  );
};

interface BlockProps {
  id: number;
  title: string;
  imageUrl: string;
  numbers: number;
  bookings: number;
  activity: number;
  money: number;
  images: string[];
}

const Block: React.FC<BlockProps> = ({
  id,
  title,
  imageUrl,
  numbers,
  bookings,
  activity,
  money,
  images,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Col span={6}>
      <Card bordered={true}>
        <Typography.Title level={4} style={{ borderBottom: '1px solid #D4D4D4' }}>
          {title}
        </Typography.Title>
        <Space direction="vertical" style={{ width: '300px', height: '100%', display: 'flex', flexDirection: 'row' }}>
          <Carousel
            style={{ width: '140px', height: '100px' }}
            autoplay={true}
            effect="fade"
            afterChange={handleImageChange}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image} // Используйте image из массива images
                  alt={`Image ${id}-${index}`}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            ))}
          </Carousel>
          <Col style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Typography.Text>
              <span>Номеров:</span>
              <span style={{ marginLeft: '5px' }}>{numbers}</span>
            </Typography.Text>
            <Typography.Text>
              <span>Броней:</span>
              <span style={{ marginLeft: '5px' }}>{bookings}</span>
            </Typography.Text>
            <Typography.Text>
              <span>Активность:</span>
              <span style={{ marginLeft: '5px' }}>{activity}</span>
            </Typography.Text>
            <Typography.Text>
              <span>Деньги:</span>
              <span style={{ marginLeft: '5px' }}>
                {money}
                <span>&#8381;</span>
              </span>
            </Typography.Text>
          </Col>
        </Space>
        <Col
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '20px', borderTop: '1px solid #D4D4D4' }}
        >
          {images.map((image, index) => (
            <Col key={index} style={{ background: '#AF0000', width: '20px', height: '20px', marginTop: '20px' }} />
          ))}
        </Col>
      </Card>
    </Col>
  );
};

const blockData: BlockProps[] = [
  {
    id: 1,
    title: 'Отель 1',
    imageUrl: 'https://picsum.photos/id/1015/140/100',
    numbers: 10,
    bookings: 5,
    activity: 70,
    money: 10000,
    images: [
      'https://picsum.photos/id/1018/20/20',
      'https://picsum.photos/id/1019/20/20',
      'https://picsum.photos/id/1020/20/20',
      'https://picsum.photos/id/1021/20/20',
    ],
  },
  {
    id: 2,
    title: 'Отель 2',
    imageUrl: 'https://picsum.photos/id/1015/140/100',
    numbers: 10,
    bookings: 5,
    activity: 70,
    money: 10000,
    images: [
      'https://picsum.photos/id/1018/20/20',
      'https://picsum.photos/id/1019/20/20',
      'https://picsum.photos/id/1020/20/20',
      'https://picsum.photos/id/1021/20/20',
    ],
  },
  {
    id: 3,
    title: 'Отель 3',
    imageUrl: 'https://picsum.photos/id/1015/140/100',
    numbers: 10,
    bookings: 5,
    activity: 70,
    money: 10000,
    images: [
      'https://picsum.photos/id/1018/20/20',
      'https://picsum.photos/id/1019/20/20',
      'https://picsum.photos/id/1020/20/20',
      'https://picsum.photos/id/1021/20/20',
    ],
  },
  {
    id: 4,
    title: 'Отель 4',
    imageUrl: 'https://picsum.photos/id/1015/140/100',
    numbers: 10,
    bookings: 5,
    activity: 70,
    money: 10000,
    images: [
      'https://picsum.photos/id/1018/20/20',
      'https://picsum.photos/id/1019/20/20',
      'https://picsum.photos/id/1020/20/20',
      'https://picsum.photos/id/1021/20/20',
    ],
  },
  // ... остальные данные отелей
];

export const HotelsPage: FC = () => {
  return (
     <MainLayout header={ <HotelsPageHeader />}>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        {blockData.map((block) => (
          <Block key={block.id} {...block} />
        ))}
      </Row>
   </MainLayout>

  );
};

