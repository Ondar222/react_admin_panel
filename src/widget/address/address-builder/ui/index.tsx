import { YurtaSelect } from "@/shared/components/form/ui/select/default";
import { Drawer, DrawerProps, Form, Input, Select } from "antd";
import { FC } from "react";

interface IAddressBuilderUI extends DrawerProps {
  address: {
    [fieldName: string]: string
  }
  onInputClick: () => void
}


const AddressBuilderUI: FC<IAddressBuilderUI> = (props) => {
  return (
    <>
      <Input
        value={props.address.region}
        onClick={props.onInputClick}
        contentEditable={false}
        style={{
          cursor: "pointer"
        }}
      />
      <Drawer
        {...props}
        title="Построить адрес"
        width={"30%"}
      >
        <Form layout="vertical">
          <Form.Item label="Индекс" >
            <Input value={props.address.postal_code} />
          </Form.Item>
          <Form.Item label="Страна">
            <Input value={props.address.country} />
          </Form.Item>

          <Form.Item label="Регион">
            <Input value={props.address.region} />
          </Form.Item>


          <YurtaSelect label="Тип населенного пункта" value={props.address.settlement_type} >
          <Select.Option value="city">Город</Select.Option>
          <Select.Option value="urban-type-settlement">Поселок городского типа</Select.Option>
          <Select.Option value="village">Село</Select.Option>
          </YurtaSelect>

          <Form.Item label="Название населенного пункта">
            <Input value={props.address.settlement} />
          </Form.Item>

          <YurtaSelect label="Тип улицы" value={props.address.street_type} />
          <Form.Item label="Название улицы">
            <Input value={props.address.street} />
          </Form.Item>
          <Form.Item label="Дом">
            <Input value={props.address.house} />
          </Form.Item>
          <Form.Item label="Строение">
            <Input value={props.address.block} />
          </Form.Item>
          <Form.Item label="Литера дом">
            <Input value={props.address.house_litera} />
          </Form.Item>
          <Form.Item label="Координаты">
            <Input value={props.address.coordinates} />
          </Form.Item>
          <Form.Item label="Долгота">
            <Input value={props.address.longitude} />
          </Form.Item>
          <Form.Item label="Широта">
            <Input value={props.address.latitude} />
          </Form.Item>
        </Form>
      </Drawer >
    </>

  )
}

export { AddressBuilderUI }