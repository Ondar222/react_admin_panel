import { UploadProps, UploadFile } from "antd"
import { UploadChangeParam } from "antd/es/upload"

interface IYurtaUpload extends Omit<UploadProps, "onChange" | "onRemove"> {
    label: string
    fieldName: string
    onChange: (fieldName: string, info: UploadChangeParam<UploadFile<any>>) => void
    onRemove?: (fieldName: string, file: UploadFile) => void
}

export type { IYurtaUpload }