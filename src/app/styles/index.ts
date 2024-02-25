interface ICustomObject {
    id: number
    name: string
    surname: string
    patronymic: string
    phone: Array<{
        number: string,
        operator: string
    }>
    email: string
}

const obj: ICustomObject = {
    id: 0,
    name: "name",
    surname: "surname",
    patronymic: "patronymic",
    phone: [
        {number: "791234567889", operator: "MTS"},
        {number: "79851234567889", operator: "BEELINE"}
    ],
    email: "as@mail.ru"
}