import { useHotel } from "@/entities/hotel/api";
import { AddressBuilderPresenter } from "@/entities/hotel/ui/form/address-builder/presenter";
import { RoomUpdateDto } from "@/entities/room";
import { getBase64 } from "@/widget/room/creation-form.tsx/ui";
import { YurtaUpload } from "@/shared/components/form/ui/input/file";
import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { MainLayout } from "@/shared/layouts/layout";
import { DownloadOutlined, SwapOutlined, RotateLeftOutlined, RotateRightOutlined, ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons";
import { Col, Form, Input, Typography, UploadProps, Image, UploadFile, Button, Space } from "antd";
import { RcFile } from "antd/es/upload";
import { ItemRender } from "antd/es/upload/interface";
import { FC, useEffect, useState } from "react";


const HotelPage: FC = () => {
  const { hotel, setHotel, updateHotel } = useHotel()

  useEffect(() => {
    setHotel()
  }, [])

  useEffect(() => {
    setUpdate({
      images: hotel?.images?.map((image) => ({
        uid: image,
        name: image,
        thumbUrl: image
      })),
      cover: {
        uid: hotel?.cover,
        name: hotel?.cover,
        thumbUrl: hotel?.cover
      }
    })
  }, [hotel?.images, hotel?.cover])

  const [addressKeys, setAddressKeys] = useState<{ [key: string]: string }>()
  const [update, setUpdate] = useState<{ cover: UploadFile, images: Array<UploadFile> }>()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldname = e.target.name
    setUpdate((prev) => ({ ...prev, [fieldname]: e.target.value }))
  }

  const onDownload = () => {
    fetch(
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    )
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  // upload component handlers
  const handleItemRender: ItemRender = (item, file) => {
    return (
      <Image
        src={file.thumbUrl}
        height={100}
        width={100}
        preview={{
          toolbarRender: (
            _,
            {
              transform: { scale },
              actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
            },
          ) => (
            <Space size={12} className="toolbar-wrapper">
              <Button>delete</Button>
              <DownloadOutlined onClick={onDownload} />
              <SwapOutlined rotate={90} onClick={onFlipY} />
              <SwapOutlined onClick={onFlipX} />
              <RotateLeftOutlined onClick={onRotateLeft} />
              <RotateRightOutlined onClick={onRotateRight} />
            </Space>
          ),
        }}
        style={{ objectFit: "cover", borderRadius: 8 }}
      />
    )
  }

  const handleFilesChange: UploadProps['onChange'] = (e) => {
    setUpdate((prev) => ({
      ...prev,
      images: e.fileList
    }))
  }

  const handleFileChange: UploadProps['onChange'] = async ({ file }) => {
    if (file.status === 'done') {
      getBase64(file.originFileObj as RcFile);
    }

    if (!file.url && !file.preview) {
      setUpdate((prev) => ({
        ...prev,
        cover: file
      }))
    }
  }
  return (
    <MainLayout header={<Typography.Title level={2}>Мой отель</Typography.Title>} footer="">
      <Col span={12}>
        {
          hotel &&
          <Form layout="vertical" size="large">
            <YurtaInput label="Название" value={hotel.name} />

            {hotel && <AddressBuilderPresenter address={hotel?.address} />}

            {update && <YurtaUpload
              label="Изображения"
              multiple={true}
              listType="picture-card"
              fileList={update?.images}
              itemRender={handleItemRender}
              onChange={handleFilesChange}
            />}


            {update && (
              <YurtaUpload
                label="Превью"
                multiple={true}
                listType="picture-card"
                fileList={[update?.cover]}
                itemRender={handleItemRender}
                onChange={handleFileChange}
              />
            )}

            <Button onClick={() => {
              updateHotel({
                id: hotel.id,
                cover: update.cover,
                images: update.images,
                name: hotel.name,

                address: 2,
                description: ""
              })
            }}>Сохранить</Button>
          </Form>
        }
      </Col>
    </MainLayout >
  )
}

export { HotelPage }