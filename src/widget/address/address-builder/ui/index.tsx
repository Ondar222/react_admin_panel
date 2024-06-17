import { YurtaSelect } from "@/shared/components/form/ui/select/default";
import { Drawer, DrawerProps, Form, Input, Select, Button, Tooltip } from "antd";
import { FC, useMemo, useState  } from "react";

interface IAddressBuilderUI extends DrawerProps {
  address: {
    [fieldName: string]: string;
  };
  onInputClick: () => void;
  onSave: () => void; // Добавлен onSave  
};

const indexText =  <span>Например: 667901</span>;
const nameCityText =  <span>Пишите только название. Например: г. Кызыл</span>;
const nameStreetText =  <span>Пишите только название. Например: ул. Ленина</span>;
const houseText =  <span>Пишите только цифру. Например: 3, 4 и тд...</span>;
const buildingText =  <span>Например: стр 3</span>;
const literText =  <span>Пример: "лит. А, лит. B"</span>;
const coordinatesText = <span>Сначала указывается широта, затем долгота.Пример: 15° с.ш. 30° в.д.</span>;
const widthText = <span>Например: 15° с. ш.</span>;
const longitudeText = <span>Например: 74 ° в. д.</span>;

const AddressBuilderUI: FC<IAddressBuilderUI> = (props) => {
  const [arrow, setArrow] = useState('Show');
  
  const mergedArrow = useMemo(() => {
    if (arrow === 'Hide') {
      return false;
    }

    if (arrow === 'Show') {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  return (
    <>
      <Input
        value={props.address.region}
        onClick={props.onInputClick}
        contentEditable={false}
        style={{
          cursor: "pointer",
        }}
      />
      <Drawer
        {...props}
        title="Построить адрес"
        width={"30%"}
      >
        <Form layout="vertical">
          <Form.Item label="Индекс">
          <Tooltip placement="bottomLeft" title={indexText} arrow={mergedArrow} color="gray">  
            <Input value={props.address.postal_code} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Страна">
            <Input value={props.address.country} />
          </Form.Item>

          <Form.Item label="Регион">
            <Input value={props.address.region} />
          </Form.Item>

          <YurtaSelect
            label="Тип населенного пункта"
            value={props.address.settlement_type}
          >
            <Select.Option value="city">Город</Select.Option>
            <Select.Option value="urban-type-settlement">
              Поселок городского типа
            </Select.Option>
            <Select.Option value="village">Село</Select.Option>
          </YurtaSelect>

          <Form.Item label="Название населенного пункта">
          <Tooltip placement="bottomLeft" title={nameCityText} arrow={mergedArrow} color="gray">  
            <Input value={props.address.settlement} />
            </Tooltip>
          </Form.Item>

          <YurtaSelect label="Тип улицы" value={props.address.street_type} />
          <Form.Item label="Название улицы">
          <Tooltip placement="bottomLeft" title={nameStreetText} arrow={mergedArrow} color="gray">  
            <Input value={props.address.street} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Дом">
          <Tooltip placement="bottomLeft" title={houseText} arrow={mergedArrow} color="gray">  
            <Input value={props.address.house} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Строение">
          <Tooltip placement="bottomLeft" title={buildingText} arrow={mergedArrow} color="gray">  
            <Input value={props.address.block} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Литера дом">
          <Tooltip placement="bottomLeft" title={literText} arrow={mergedArrow} color="gray">   
            <Input value={props.address.house_litera} />
            </Tooltip>
    
          </Form.Item>
          <Form.Item label="Координаты">
          <Tooltip placement="bottomLeft" title={coordinatesText} arrow={mergedArrow} color="gray">     
            <Input value={props.address.coordinates} />
          </Tooltip>
          </Form.Item>
          <Form.Item label="Широта">
          <Tooltip placement="bottomLeft" title={widthText} arrow={mergedArrow} color="gray">    
            <Input value={props.address.latitude} />
            </Tooltip>
          </Form.Item>
          <Form.Item label="Долгота">
          <Tooltip placement="bottomLeft" title={longitudeText} arrow={mergedArrow} color="gray">    
            <Input value={props.address.longitude} />
            </Tooltip>
          </Form.Item>
      

          <Form.Item>
            <Button type="primary" onClick={props.onSave}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export { AddressBuilderUI };