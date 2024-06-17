import { FC, useState } from "react";
import { AddressBuilderUI } from "../ui";

function OtherPage() {
  const initialAddress = {
    street: 'ул. Пушкина',
    house: '10',
    flat: '123',
    city: 'Кызыл',
    region: 'Республика Тыва',
    country: 'Россия'
  };
}

interface IAddressBuilderPresenter {
  address: {
    [fieldName: string]: string
  }
}

const AddressBuilderPresenter: FC<IAddressBuilderPresenter> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [address, setAddress] = useState<{ [fieldName: string]: string }>(props.address)

  const handleSaveAddress = () => {
    // Логика сохранения адреса
    console.log("Сохраненный адрес:", address);
  };

  return (
    <>
      {props.address && <AddressBuilderUI
        {...props}
        open={open}
        address={address}
        onSave={handleSaveAddress}
        onClose={() => setOpen(false)}
        onInputClick={() => setOpen(true)}
      />}
  

    </>

  )
};

export { AddressBuilderPresenter };
