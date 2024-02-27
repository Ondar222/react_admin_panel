import { FC, useState } from "react";
import { Button, Form, Upload, UploadProps, Image, Space, Modal, GetProp } from "antd";
import { UploadIcon } from "@/assets/icons/upload";
import { DeleteIcon } from "@/assets/icons/delete";
import room from "@/pages/room";
import { IconButton } from "@/shared/components/button/action-buttons";
import { SwapOutlined, RotateLeftOutlined, RotateRightOutlined, ZoomOutOutlined, ZoomInOutlined } from "@ant-design/icons";
import { ItemRender, UploadFile } from "antd/es/upload/interface";
import { UploadChangeParam } from "antd/lib/upload";
import { FileType, getBase64 } from "@/shared/utils";
import { IYurtaUpload } from "./interface";

const YurtaUpload: FC<IYurtaUpload> = ({ label, fieldName, onChange, onRemove, ...props }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = (info: UploadChangeParam) => onChange(fieldName, info)
  const handleRemove = (file: UploadFile) => onRemove(fieldName, file)

  return (
    <Form.Item
      label={label}>
      <Upload {...props}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
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