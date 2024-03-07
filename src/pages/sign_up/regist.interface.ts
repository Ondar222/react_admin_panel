export interface IAddress {
    country: string
    city: string
    street: string
    house: string
}

// надо вынести куда-нибудь, тут только страницы

export interface ISippingField {
    name: string
    surname: string
    phoneNumber: string
    email: string
    password: string
    address: IAddress
}