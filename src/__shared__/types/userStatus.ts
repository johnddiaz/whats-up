export interface ServerUserStatus {
    state: 'online' | 'offline'
    lastChanged: Object
}

export interface UserStatus {
    state: 'online' | 'offline'
    lastChanged: string
}

export interface UserStatuses {
    [userId: string]: UserStatus
}
