import { YurtaUpload } from "@/shared/components/form/ui/input/file";
import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { Button, Form } from "antd";
import { FC } from "react";
import { HotelUpdateFormUIProps } from "../model";
import { YurtaEditor } from "@/shared/editor";

export const HotelUpdateFormUI: FC<HotelUpdateFormUIProps> = (props) => (
  
  <Form layout="vertical">
    
    <YurtaInput
      label="Название"
      name="name"
      value={props.hotel?.name}
      onChange={props.handleChange}
    />

    <YurtaEditor
      value={props.hotel.description}
      onChange={props.handleEditorChange}
    />

    <YurtaUpload
      label="Превью"
      name="cover"
      method="POST"
      action={`${import.meta.env.VITE_API}/hotel/my/images`}
      multiple={false}
      maxCount={1}
      listType="picture-card"
      fileList={props?.cover || undefined}
      onChange={props.onFileChange}
      onRemove={props.onFileRemove}
    />

    <YurtaUpload
      label="Изображения"
      name="images"
      method="POST"
      action={`${import.meta.env.VITE_API}/hotel/my/images`}
      multiple={true}
      maxCount={20}
      listType="picture-card"
      defaultFileList={props?.images || []}
      fileList={props?.images || []}
      onChange={props.onFileChange}
      onRemove={props.onFileRemove}
    />

    <Button onClick={() => props.onSubmit(props.hotel)}>Сохранить</Button>
  </Form>
);
