import { FC, useState } from "react";
import { Button, Form, Upload, Image } from "antd";
import { UploadIcon } from "@/assets/icons/upload";
import { UploadFile } from "antd/es/upload/interface";
import { UploadChangeParam, UploadProps } from "antd/lib/upload";
import { FileType, getBase64 } from "@/shared/utils";
import { useCredentails } from "@/features/auth";

interface YurtaUploadProps extends Omit<UploadProps, "onChange" | "onRemove"> {
  label: string,

  onChange: (name: string, info: UploadChangeParam<UploadFile<any>>) => void
  onRemove: (name: string, file: UploadFile) => void
}

interface IYurtaUploadUIProps extends Omit<UploadProps, "onChange" | "onRemove"> {
  label: string
  previewImage?: string
  previewOpen?: boolean
  onVisibleChange?: (value: boolean, prev: boolean) => void

  onChange: (name: string, info: UploadChangeParam<UploadFile<any>>) => void
  onRemove: (name: string, file: UploadFile) => void
}


const YurtaUpload: FC<YurtaUploadProps> = (props) => {
  const [fileList, setFileList] = useState<Array<UploadFile>>(props.fileList)
  const [previewImage, setPreviewImage] = useState<string>()
  const [previewOpen, setPreviewOpen] = useState<boolean>()
  const { access_token } = useCredentails()

  const handlePreview: UploadProps["onPreview"] = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.thumbUrl || file.preview);
    setPreviewOpen(true);
  }

  const handleChange = async (name: string, info: UploadChangeParam<UploadFile<any>>) => {

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

    console.group('from component')
    console.log(info)
    console.log(info.file.status)
    console.groupEnd()


    setFileList(images)

    if (props.onChange)
      props?.onChange(name, { file: info.file, fileList: images, event: info.event })
  }

  const handleRemove = (name: string, file: UploadFile) => {
    setFileList((prev) => prev.filter((image) => image.uid != file.uid))
    if (props.onRemove)
      props?.onRemove(name, file)
  }

  return (
    <YurtaUploadUI
      {...props}
      headers={{
        "Authorization": `Bearer ${access_token}`
      }}
      fileList={fileList}
      onChange={handleChange}
      onRemove={handleRemove}
      onPreview={handlePreview}

      previewImage={previewImage}
      previewOpen={previewOpen}
      onVisibleChange={setPreviewOpen}
    />
  )
}

const YurtaUploadUI: FC<IYurtaUploadUIProps> = (props) =>
  <Form.Item
    label={props.label}>
    <Upload
      {...props}
      onChange={(info) => props.onChange(props.name, info)}
      onRemove={(file) => props.onRemove(props.name, file)}
    >
      <Button icon={<UploadIcon />} style={{ position: "absolute" }}></Button>
    </Upload>
    <Image
      src={props.previewImage}
      preview={{
        visible: props.previewOpen,
        onVisibleChange: props.onVisibleChange
      }}
      height={0}
      width={0} />
  </Form.Item>

export { YurtaUpload, YurtaUploadUI }