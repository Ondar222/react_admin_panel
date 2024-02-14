import { YurtaInput } from "@/shared/components/form/ui/input/text";
import { YurtaSelect } from "@/shared/components/form/ui/select/default";
import { Drawer, DrawerProps, Form } from "antd";
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
      <YurtaInput
        label="Адрес"
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
          <YurtaInput label="Индекс" value={props.address.postal_code} />
          <YurtaInput label="Страна" value={props.address.country} />
          <YurtaInput label="Регион" value={props.address.region} />
          <YurtaSelect label="Тип населенного пункта" value={props.address.settlement_type} />
          <YurtaInput label="Название населенного пункта" value={props.address.settlement} />
          <YurtaSelect label="Тип улицы" value={props.address.street_type} />
          <YurtaInput label="Название улицы" value={props.address.street} />
          <YurtaInput label="Дом" value={props.address.house} />
          <YurtaInput label="Строение" value={props.address.block} />
          <YurtaInput label="Литера дом" value={props.address.house_litera} />
          <YurtaInput label="Координаты" value={props.address.coordinates} />
          <YurtaInput label="Долгота" value={props.address.longitude} />
          <YurtaInput label="Широта" value={props.address.latitude} />
        </Form>
      </Drawer>
    </>

  )
}

export { AddressBuilderUI }