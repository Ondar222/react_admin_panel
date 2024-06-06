import React, { useState, FC } from 'react';
import { Row, Col, Typography, Card, Space, Button,Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '@/shared/layouts/layout';


const HotelsPageHeader: FC = () => {
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
        <Typography.Title level={4} style={{borderBottom: "1px solid #D4D4D4"}}>{title}</Typography.Title>
        <Space direction="vertical" style={{width: "300px", height: '100%', display: "flex", flexDirection: "row" }}>
          <Carousel
            style={{ width: '140px', height: "100px" }}
            autoplay={true}
            effect="fade"
            afterChange={handleImageChange}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src="../../img/hotelsImg.png"
                  alt={`Image ${id}-${index}`}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            ))}
          </Carousel>
            <Col style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <Typography.Text>
                <span>Номеров:</span>
                <span style={{marginLeft: "5px"}}>{numbers}</span>
              </Typography.Text>
              <Typography.Text>
                <span>Броней:</span>
                <span style={{marginLeft: "5px"}}>{bookings}</span>
              </Typography.Text>
              <Typography.Text>
                <span>Активность:</span>
                <span style={{marginLeft: "5px"}}>{activity}</span>
              </Typography.Text>
              <Typography.Text>
                <span>Деньги:</span>
                <span style={{marginLeft: "5px"}}>
                  {money}<span>&#8381;</span>
                </span>
              </Typography.Text>
            </Col>
          </Space>
          <Col style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: "20px", borderTop: "1px solid #D4D4D4" }}>
            {images.map((image, index) => (
              <Col key={index} style={{background: "#AF0000", width: "20px", height: "20px", marginTop: "20px"}} />
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
    imageUrl: 'https://picsum.photos/id/1016/140/100',
    numbers: 15,
    bookings: 8,
    activity: 80,
    money: 15000,
    images: [
      'https://picsum.photos/id/1022/20/20',
      'https://picsum.photos/id/1023/20/20',
      'https://picsum.photos/id/1024/20/20',
      'https://picsum.photos/id/1025/20/20',
    ],
  },
  {
    id: 3,
    title: 'Отель 3',
    imageUrl: 'https://picsum.photos/id/1017/140/100',
    numbers: 20,
    bookings: 12,
    activity: 90,
    money: 20000,
    images: [
      'https://picsum.photos/id/1026/20/20',
      'https://picsum.photos/id/1027/20/20',
      'https://picsum.photos/id/1028/20/20',
      'https://picsum.photos/id/1029/20/20',
    ],
  },
  {
    id: 4,
    title: 'Отель 4',
    imageUrl: 'https://picsum.photos/id/1030/140/100',
    numbers: 25,
    bookings: 15,
    activity: 100,
    money: 25000,
    images: [
      'https://picsum.photos/id/1031/20/20',
      'https://picsum.photos/id/1032/20/20',
      'https://picsum.photos/id/1033/20/20',
      'https://picsum.photos/id/1034/20/20',
    ],
  },
  {
    id: 5,
    title: 'Отель 5',
    imageUrl: 'https://picsum.photos/id/1035/140/100',
    numbers: 30,
    bookings: 20,
    activity: 110,
    money: 30000,
    images: [
      'https://picsum.photos/id/1036/20/20',
      'https://picsum.photos/id/1037/20/20',
      'https://picsum.photos/id/1038/20/20',
      'https://picsum.photos/id/1039/20/20',
    ],
  },
  {
    id: 6,
    title: 'Отель 6',
    imageUrl: 'https://picsum.photos/id/1040/140/100',
    numbers: 35,
    bookings: 25,
    activity: 120,
    money: 35000,
    images: [
      'https://picsum.photos/id/1041/20/20',
      'https://picsum.photos/id/1042/20/20',
      'https://picsum.photos/id/1043/20/20',
      'https://picsum.photos/id/1044/20/20',
    ],
  },
  {
    id: 7,
    title: 'Отель 7',
    imageUrl: 'https://picsum.photos/id/1045/140/100',
    numbers: 40,
    bookings: 30,
    activity: 130,
    money: 40000,
    images: [
      'https://picsum.photos/id/1046/20/20',
      'https://picsum.photos/id/1047/20/20',
      'https://picsum.photos/id/1048/20/20',
      'https://picsum.photos/id/1049/20/20',
    ],
  },
  {
    id: 8,
    title: 'Отель 8',
    imageUrl: 'https://picsum.photos/id/1050/140/100',
    numbers: 45,
    bookings: 35,
    activity: 140,
    money: 45000,
    images: [
      'https://picsum.photos/id/1051/20/20',
      'https://picsum.photos/id/1052/20/20',
      'https://picsum.photos/id/1053/20/20',
      'https://picsum.photos/id/1054/20/20',
    ],
  },
  {
    id: 9,
    title: 'Отель 9',
    imageUrl: 'https://picsum.photos/id/1055/140/100',
    numbers: 50,
    bookings: 40,
    activity: 150,
    money: 50000,
    images: [
      'https://picsum.photos/id/1056/20/20',
      'https://picsum.photos/id/1057/20/20',
      'https://picsum.photos/id/1058/20/20',
      'https://picsum.photos/id/1059/20/20',
    ],
  },
  {
    id: 10,
    title: 'Отель 10',
    imageUrl: 'https://picsum.photos/id/1060/140/100',
    numbers: 55,
    bookings: 45,
    activity: 160,
    money: 55000,
    images: [
      'https://picsum.photos/id/1061/20/20',
      'https://picsum.photos/id/1062/20/20',
      'https://picsum.photos/id/1063/20/20',
      'https://picsum.photos/id/1064/20/20',
    ],
  },
  {
    id: 11,
    title: 'Отель 11',
    imageUrl: 'https://picsum.photos/id/1065/140/100',
    numbers: 60,
    bookings: 50,
    activity: 170,
    money: 60000,
    images: [
      'https://picsum.photos/id/1066/20/20',
      'https://picsum.photos/id/1067/20/20',
      'https://picsum.photos/id/1068/20/20',
      'https://picsum.photos/id/1069/20/20',
    ],
  },
  {
    id: 12,
    title: 'Отель 12',
    imageUrl: 'https://picsum.photos/id/1070/140/100',
    numbers: 65,
    bookings: 55,
    activity: 180,
    money: 65000,
    images: [
      'https://picsum.photos/id/1071/20/20',
      'https://picsum.photos/id/1072/20/20',
      'https://picsum.photos/id/1073/20/20',
      'https://picsum.photos/id/1074/20/20',
    ],
  },
];

export const HotelsPage: React.FC = () => {
  return (
    <MainLayout header={<HotelsPageHeader />}>
      <div>
        <Row gutter={[10, 10]}>
          {blockData.map((block) => (
            <Block key={block.id} {...block} />
          ))}
        </Row>
      </div>
    </MainLayout>
  );
};