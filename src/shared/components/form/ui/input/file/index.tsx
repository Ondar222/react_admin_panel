import { FC, useState } from "react";
import { Button, Form, Upload, Image } from "antd";
import { UploadIcon } from "@/assets/icons/upload";
import { UploadFile } from "antd/es/upload/interface";
import { UploadChangeParam } from "antd/lib/upload";
import { FileType, getBase64 } from "@/shared/utils";
import { IYurtaUpload } from "./interface";

const YurtaUpload: FC<IYurtaUpload> = ({ label, fieldName, onChange, onRemove, ...props }) => {
  const [fileList, setFileList] = useState<Array<UploadFile>>(props.fileList)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    await setPreviewImage(file.thumbUrl || file.preview);
    await setPreviewOpen(true);
  };

  const handleChange = (info: UploadChangeParam) => {
    const { file, fileList, event } = info
    const status = file.status

    console.log(fileList)

    switch (status) {
      case "removed":
        setFileList((prev) => prev.filter((removed_file) => removed_file.uid != file.uid))
        onChange(fieldName, info)
        break

      case "uploading":

        if (file.percent == 0) {
          setFileList((prev) => [...prev, {
            ...file
          }])

          return
        }

        if (file.percent == 100) {
          const images = fileList
          images.filter((file) => file.uid )

          setFileList((prev) => [...images, {
            ...file,
            status: "done"
          }])
          onChange(fieldName, info)
          return
        }
        break
      case "done":
        console.log(file, 'done')
        break
    }

  }

  return (
    <Form.Item
      label={label}>
      <Upload
        {...props}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        <Button icon={<UploadIcon />} style={{ position: "absolute" }}></Button>
      </Upload>
      <Image
        src={previewImage}
        preview={{
          visible: previewOpen,
          onVisibleChange: (value) => {
            setPreviewOpen(value)
          }
        }}
        height={0}
        width={0} />
    </Form.Item>
  )
}

export { YurtaUpload }