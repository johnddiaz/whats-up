export interface ServerUserStatus {
    state: 'online' | 'offline'
    lastChanged: Object
}

export interface ClientUserStatus {
    state: 'online' | 'offline'
    lastChanged: string
}

export interface ClientUserStatuses {
    [userId: string]: ClientUserStatus
}
