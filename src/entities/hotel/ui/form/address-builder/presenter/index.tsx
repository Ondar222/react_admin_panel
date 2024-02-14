import { FC, useState } from "react";
import { AddressBuilderUI } from "../ui";

interface IAddressBuilderPresenter {
  address: {
    [fieldName: string]: string
  }
}

const AddressBuilderPresenter: FC<IAddressBuilderPresenter> = (props) => {
  const [open, setOpen] = useState<boolean>(false)
  const [address, setAddress] = useState<{ [fieldName: string]: string }>(props.address)

  return (
    <>
      {props.address && <AddressBuilderUI
        {...props}
        open={open}
        address={address}
        onClose={() => setOpen(false)}
        onInputClick={() => setOpen(true)}
      />}

    </>

  )
};

export { AddressBuilderPresenter };
