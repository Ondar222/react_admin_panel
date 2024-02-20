import { Button, Form, Image, Space, UploadProps } from "antd"
import React, { FC } from "react"
import { Room, RoomCreationDto, RoomTypes, RoomUpdateDto, useRoom, } from "../../../../entities/room"
import { RcFile } from "antd/es/upload"
import { ItemRender } from "antd/es/upload/interface"
import { YurtaInput } from "@/shared/components/form/ui/input/text"
import { YurtaUpload } from "@/shared/components/form/ui/input/file"
import { YurtaSelect } from "@/shared/components/form/ui/select/default"
import { DownloadOutlined, SwapOutlined, RotateLeftOutlined, RotateRightOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons"
import { DeleteButton, IconButton } from "@/shared/components/button/action-buttons"
import { DeleteIcon } from "@/assets/icons/delete"

// разделить на контроллеры
interface IRoomForm {
  room: RoomCreationDto | RoomUpdateDto
  setRoom: React.Dispatch<React.SetStateAction<RoomCreationDto>> | React.Dispatch<React.SetStateAction<RoomUpdateDto>>
  onSaveButtonClick: React.MouseEventHandler<HTMLElement>

  controller?: {
    type: "create" | "update"
    room: RoomCreationDto
    setRoom: React.Dispatch<React.SetStateAction<RoomCreationDto | RoomUpdateDto>>
    onSaveButtonClick: React.MouseEventHandler<HTMLElement>
  }
}

interface IRoomCreationForm {
  room: RoomCreationDto
  setRoom: React.Dispatch<React.SetStateAction<RoomCreationDto>>
  onSaveButtonClick: React.MouseEventHandler<HTMLElement>

  controller?: {
    type: "create" | "update"
    room: RoomCreationDto
    setRoom: React.Dispatch<React.SetStateAction<RoomCreationDto>>
    onSaveButtonClick: React.MouseEventHandler<HTMLElement>
  }
}

interface IRoomUpdateForm {
  room: RoomUpdateDto
  setRoom: React.Dispatch<React.SetStateAction<RoomUpdateDto>>
  onSaveButtonClick: React.MouseEventHandler<HTMLElement>

  controller?: {
    type: "create" | "update"
    room: RoomUpdateDto
    setRoom: React.Dispatch<React.SetStateAction<RoomUpdateDto>>
    onSaveButtonClick: React.MouseEventHandler<HTMLElement>
  }
}

const RoomCreateForm: FC<IRoomCreationForm> = ({ room, setRoom, onSaveButtonClick }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldname = e.target.name
    setRoom((prev: RoomCreationDto) => ({ ...prev, [fieldname]: e.target.value }))
  }

  // upload component handlers
  const handleItemRender: ItemRender = (item, file) => {
    return (
      <Image src={file.thumbUrl} height={100} width={100} style={{ objectFit: "cover", borderRadius: 8 }} />
    )
  }

  const handleFilesChange: UploadProps['onChange'] = (e) => {
    setRoom((prev: RoomCreationDto) => ({
      ...prev,
      images: e.fileList
    }))
  }

  const handleFileChange: UploadProps['onChange'] = async ({ file }) => {
    if (file.status === 'done') {
      getBase64(file.originFileObj as RcFile);
    }

    if (!file.url && !file.preview) {
      setRoom((prev: RoomCreationDto) => ({
        ...prev,
        cover: file
      }))
    }
  }

  return (
    <Form
      layout="vertical"
      size="large"
    >

      <YurtaInput
        label="Название комнаты"
        placeholder="Название комнаты"
        value={room?.name}
        name="name"
        onChange={handleChange}
      />

      <YurtaInput
        label="Идентификатор номера"
        placeholder="Идентификатор номера"
        value={room?.number}
        name="number"
        onChange={handleChange}
      />

      <YurtaInput
        label="Стоимость"
        type="number"
        placeholder="Стоимость"
        value={room?.price}
        name="price"
        onChange={handleChange}
      />

      <YurtaSelect
        label="Тип комнаты"
        placeholder="Тип комнаты"
        value={room?.type}
        options={Object.keys(RoomTypes).map((status) => ({
          value: status,
          label: status
        }))}
        onChange={(e: RoomTypes) => setRoom((prev: RoomCreationDto) => ({ ...prev, type: e as RoomTypes }))
        }
      />

      <YurtaInput
        label="Вместимость"
        type="number"
        placeholder="Вместимость"
        value={room?.capacity}
        name="capacity"
        onChange={handleChange}
      />

      <YurtaUpload
        label="Обложка"
        multiple={false}
        listType="picture-card"
        itemRender={handleItemRender}
        maxCount={1}
        onChange={handleFileChange}
      />

      <YurtaUpload
        label="Изображения"
        multiple={true}
        listType="picture-card"
        fileList={room?.images}
        itemRender={handleItemRender}
        onChange={handleFilesChange}
      />

      <Button
        onClick={onSaveButtonClick}>
        Сохранить
      </Button>
    </Form>
  )
}

const RoomUpdateForm: FC<IRoomUpdateForm> = ({ room, setRoom, onSaveButtonClick }) => {
  const { deleteImage, uploadImage } = useRoom()
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldname = e.target.name
    setRoom((prev: RoomUpdateDto) => ({ ...prev, [fieldname]: e.target.value }))
  }

  // upload component handlers
  const handleItemRender: ItemRender = (item, file) => {
    return (
      <Image
        key={file.uid}
        src={file.thumbUrl}
        height={100}
        width={100}
        preview={{
          toolbarRender: (
            node,
            {
              transform: { scale },
              actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },

            },
          ) => (
            <Space size={12} className="toolbar-wrapper">
              <IconButton type="text" icon={DeleteIcon} onClick={() => {
                deleteImage(room.id, file.uid)
                setRoom((prev) => ({
                  ...prev,
                  images: prev.images.filter((image) => image.uid != file.uid)
                }))
              }} />
              <SwapOutlined rotate={90} onClick={onFlipY} />
              <SwapOutlined onClick={onFlipX} />
              <RotateLeftOutlined onClick={onRotateLeft} />
              <RotateRightOutlined onClick={onRotateRight} />
              <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
              <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
            </Space>
          ),
        }}
        style={{ objectFit: "cover", borderRadius: 8 }}
      />
    )
  }

  const handleFilesChange: UploadProps['onChange'] = (e) => {
    uploadImage(room.id, 'images', e.file)
    setRoom((prev: RoomUpdateDto) => ({
      ...prev,
      images: e.fileList
    }))
  }

  const handleFileChange: UploadProps['onChange'] = async ({ file }) => {
    if (file.status === 'done') {
      getBase64(file.originFileObj as RcFile);
    }

    if (!file.url && !file.preview) {
      setRoom((prev: RoomUpdateDto) => ({
        ...prev,
        cover: file
      }))
    }
  }

  return (
    <Form
      layout="vertical"
      size="large"
    >
      {room?.id && <YurtaInput
        label="id"
        value={room?.id}
        name="id"
        disabled
      />}

      <YurtaInput
        label="Название комнаты"
        placeholder="Название комнаты"
        value={room?.name}
        name="name"
        onChange={handleChange}
      />

      <YurtaInput
        label="Идентификатор номера"
        placeholder="Идентификатор номера"
        value={room?.number}
        name="number"
        onChange={handleChange}
      />

      <YurtaInput
        label="Стоимость"
        type="number"
        placeholder="Стоимость"
        value={room?.price}
        name="price"
        onChange={handleChange}
      />

      <YurtaSelect
        label="Тип комнаты"
        placeholder="Тип комнаты"
        value={room?.type}
        options={Object.keys(RoomTypes).map((status) => ({
          value: status,
          label: status
        }))}
        onChange={(e: RoomTypes) => setRoom((prev: RoomUpdateDto) => ({ ...prev, type: e as RoomTypes }))
        }
      />

      <YurtaInput
        label="Вместимость"
        type="number"
        placeholder="Вместимость"
        value={room?.capacity}
        name="capacity"
        onChange={handleChange}
      />


      <YurtaUpload
        style={{
          position: "absolute"
        }}
        label="Обложка"
        multiple={false}
        listType="picture-card"
        fileList={[room.cover]}
        itemRender={handleItemRender}
        maxCount={1}
        onChange={handleFileChange}
      >
      </YurtaUpload>


      <YurtaUpload
        label="Изображения"
        multiple={true}
        listType="picture-card"
        fileList={room?.images}
        itemRender={handleItemRender}
        maxCount={100}
        onChange={handleFilesChange}
      />

      <Button
        onClick={onSaveButtonClick}>
        Сохранить
      </Button>
    </Form>
  )
}

export { RoomCreateForm, RoomUpdateForm }


// надо закинуть в утилс
export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });