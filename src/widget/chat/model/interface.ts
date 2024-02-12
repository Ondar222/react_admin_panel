interface IMessage {
    id: string
    sender: string
    receiver: string
    message: string

    date: Date
    status: string
}

interface IChat {
    id: string
    members: []

    messages: IMessage[]
}

export type { IMessage, IChat }