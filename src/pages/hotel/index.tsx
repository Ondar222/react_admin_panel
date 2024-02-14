import { useHotel } from "@/entities/hotel/api";
import { AddressBuilderPresenter } from "@/entities/hotel/ui/form/address-builder/presenter";
import { AddressBuilderUI } from "@/entities/hotel/ui/form/address-builder/ui";
import { RoomUpdateDto } from "@/entities/room";
import { getBase64 } from "@/entities/room/ui/creation-form.tsx/ui";
import { YurtaUpload } from "@/shared/components/form/ui/input/file";
import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { MainLayout } from "@/shared/layouts/layout";
import { Col, Form, Input, Typography, UploadProps, Image, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { ItemRender } from "antd/es/upload/interface";
import { FC, useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';

const editorConfiguration = {
  plugins: [Essentials, Bold, Italic, Paragraph],
  toolbar: ['bold', 'italic']
};

const HotelPage: FC = () => {
  const { currentHotel, setCurrentHotel } = useHotel()
  const [addressKeys, setAddressKeys] = useState<{ [key: string]: string }>()
  const [update, setUpdate] = useState<{ cover: UploadFile, images: Array<UploadFile> }>({
    images: currentHotel?.images.map((image) => ({
      uid: image,
      name: image,
      thumbUrl: image
    })),
    cover: {
      uid: currentHotel?.cover,
      name: currentHotel?.cover,
      thumbUrl: currentHotel?.cover
    }
  })

  useEffect(() => {
    if (!currentHotel)
      setCurrentHotel()
  }, [])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldname = e.target.name
    setUpdate((prev) => ({ ...prev, [fieldname]: e.target.value }))
  }

  // upload component handlers
  const handleItemRender: ItemRender = (item, file) => {
    return (
      <Image src={file.thumbUrl} height={100} width={100} style={{ objectFit: "cover", borderRadius: 8 }} />
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
          currentHotel &&
          <Form layout="vertical" size="large">
            <YurtaInput label="Название" value={currentHotel.name} />

            {currentHotel &&
              <CKEditor
                editor={ClassicEditor}
                config={editorConfiguration}
                data={currentHotel.description}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event) => {
                  console.log(event);
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
            }

            {currentHotel && <AddressBuilderPresenter address={currentHotel?.address} />}

            {currentHotel.images && <YurtaUpload
              label="Изображения"
              multiple={true}
              listType="picture-card"
              fileList={update?.images}
              itemRender={handleItemRender}
              onChange={handleFilesChange}
            />}


            {currentHotel.cover && <YurtaUpload
              label="Превью"
              multiple={true}
              listType="picture-card"
              fileList={[update?.cover]}
              itemRender={handleItemRender}
              onChange={handleFileChange}
            />}
          </Form>
        }
      </Col>


      {JSON.stringify(currentHotel)}
    </MainLayout>
  )
}

export { HotelPage }