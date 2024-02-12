import { FC } from "react";
import { Button, Form, Upload, UploadProps, Image } from "antd";
import { UploadIcon } from "@/assets/icons/upload";

interface IYurtaUpload extends UploadProps {
  label: string
}

const YurtaUpload: FC<IYurtaUpload> = ({ label, ...props }) => (
  <Form.Item label={label}>
    <Upload {...props} >
      <Button icon={<UploadIcon />} style={{ position: "absolute" }}></Button>
    </Upload>
  </Form.Item>
)


export { YurtaUpload }