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
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    await setPreviewImage(file.thumbUrl || file.preview);
    await setPreviewOpen(true);
    await setPreviewImage(file.thumbUrl || file.preview);
    await setPreviewOpen(true);
  };

  const handleChange = async (info: UploadChangeParam) => {
    if (props.multiple) {
      const images: UploadFile[] = await Promise.all(info.fileList.map(async (file) => {
        let url = file.url

        if (!file.url) {
          url = await getBase64(file.originFileObj)
        }

        return {
          url: url,
          uid: file.uid,
          name: file.name,
          originFileObj: file.originFileObj,
          thumbUrl: file.thumbUrl,
          status: "done"
        }
      }))

      setFileList(images)
      onChange(fieldName, info)
      return
    }

    if (!props.multiple) {
      const file = await getBase64(info.file.originFileObj)

      setFileList([{
        url: file,
        uid: info.file.uid,
        name: info.file.name
      }])

      onChange(fieldName, info)
      return
    }


    // const { file, fileList, event } = info
    // const status = file.status

    // switch (status) {
    //   case "removed":
    //     setFileList((prev) => prev.filter((removed_file) => removed_file.uid != file.uid))
    //     onChange(fieldName, info)
    //     break

    //   case "uploading":

    //     if (file.percent == 0) {
    //       setFileList((prev) => [...prev, {
    //         ...file,
    //         thumbUrl: file.thumbUrl,
    //         originFileObj: file.originFileObj
    //       }])
    //       onChange(fieldName, info)
    //       return
    //     }

    //     if (file.percent == 100) {
    //       const images = fileList


    //       setFileList((prev) => [...images.filter((image) => file.uid != image.uid), {
    //         ...file,
    //         status: "done"
    //       }])

    //       return
    //     }
    //     break
    //   case "done":
    //     console.log(file, 'done')
    //     break
    // }

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