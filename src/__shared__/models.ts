export interface ServerMessage {
    content: string
    sender: string
    senderName: string
    createdAt: number
    photoURL?: string
}

export interface ClientMessage extends ServerMessage {
    id: string
}

interface ClientUser {
    id: string
    userName: string
}

export interface ClientConversation {
    id: string
    otherUsers: ClientUser[]
    name: string
}
