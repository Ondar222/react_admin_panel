export interface IAddress {
    country: string
    city: string
    street: string
    house: string
}



export interface ISippingField {
    name: string
    surname: string
    phoneNumber: string
    email: string
    password: string
    address: IAddress
}