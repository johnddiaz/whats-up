import * as React from 'react'
import firebase from 'firebase'
import {
    ServerUserStatus,
    ClientUserStatuses,
} from '../../__shared__/types/userStatus'
import { ClientUser } from '../../__shared__/types/user'

export function useUsers(
    initialized: boolean,
    userId: string | undefined
): [ClientUser[], ClientUserStatuses] {
    const [statuses, setStatuses] = React.useState<ClientUserStatuses>({})
    const [users, setUsers] = React.useState<ClientUser[]>([])

    /**
     * Updates the logged-in user's status in the database.
     */
    React.useEffect(() => {
        if (!initialized || !userId) {
            return
        }

        const db = firebase.database()
        const userStatusDatabaseRef = db.ref('/status/' + userId)
        const infoConnectedRef = db.ref('.info/connected')

        // The below is from firebase docs

        const isOfflineForDatabase: ServerUserStatus = {
            state: 'offline',
            lastChanged: firebase.database.ServerValue.TIMESTAMP,
        }

        const isOnlineForDatabase: ServerUserStatus = {
            state: 'online',
            lastChanged: firebase.database.ServerValue.TIMESTAMP,
        }

        // Create a reference to the special '.info/connected' path in
        // Realtime Database. This path returns `true` when connected
        // and `false` when disconnected.
        infoConnectedRef.on('value', function (snapshot) {
            // If we're not currently connected, don't do anything.
            if (!snapshot.val()) {
                return
            }

            // If we are currently connected, then use the 'onDisconnect()'
            // method to add a set which will only trigger once this
            // client has disconnected by closing the app,
            // losing internet, or any other means.
            userStatusDatabaseRef
                .onDisconnect()
                .set(isOfflineForDatabase)
                .then(function () {
                    // The promise returned from .onDisconnect().set() will
                    // resolve as soon as the server acknowledges the onDisconnect()
                    // request, NOT once we've actually disconnected:
                    // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

                    // We can now safely set ourselves as 'online' knowing that the
                    // server will mark us as offline once we lose connection.
                    userStatusDatabaseRef.set(isOnlineForDatabase)
                })
        })

        return () => {
            infoConnectedRef.off('value')
        }
    }, [initialized, userId])

    /**
     * Reads and listens to statuses for all users.
     */
    React.useEffect(() => {
        if (!initialized) {
            return
        }

        const db = firebase.database()
        const statusRef = db.ref('/status')

        ;(async () => {
            let lastStatusKey = ''
            const newStatuses: ClientUserStatuses = {}

            const statusResolved = await db
                .ref('/status')
                .orderByKey()
                .once('value')
            statusResolved.forEach((data) => {
                if (data.key) {
                    lastStatusKey = data.key
                    newStatuses[data.key] = {
                        state: data.child('state').val(),
                        lastChanged: data.child('lastChanged').val(),
                    }
                }
            })
            setStatuses(newStatuses)

            statusRef.startAfter(lastStatusKey).on('child_added', (data) => {
                const key = data.key
                if (key) {
                    setStatuses((prev) => ({
                        ...prev,
                        [key]: {
                            state: data.child('state').val(),
                            lastChanged: data.child('lastChanged').val(),
                        },
                    }))
                }
            })

            statusRef.on('child_changed', (data) => {
                const key = data.key
                if (key) {
                    setStatuses((prev) => ({
                        ...prev,
                        [key]: {
                            state: data.child('state').val(),
                            lastChanged: data.child('lastChanged').val(),
                        },
                    }))
                }
            })
        })()

        return () => {
            statusRef.off('child_added')
            statusRef.off('child_changed')
        }
    }, [initialized])

    /**
     * Reads and listens to users.
     */
    React.useEffect(() => {
        if (!initialized) {
            return
        }

        const db = firebase.database()
        const usersRef = db.ref('/users')

        ;(async () => {
            let lastUserKey = ''
            const newUsers: ClientUser[] = []

            const usersResolved = await db
                .ref('/users')
                .orderByKey()
                .once('value')
            usersResolved.forEach((data) => {
                if (data.key) {
                    lastUserKey = data.key
                    newUsers.push({
                        id: data.key,
                        userName: data.child('userName').val(),
                        photoURL: data.child('photoURL').val(),
                    })
                }
            })
            setUsers(newUsers)

            usersRef.startAfter(lastUserKey).on('child_added', (data) => {
                const key = data.key
                if (key) {
                    setUsers((prev) => [
                        ...prev,
                        {
                            id: key,
                            userName: data.child('userName').val(),
                            photoURL: data.child('photoURL').val(),
                        },
                    ])
                }
            })

            usersRef.on('child_changed', (data) => {
                const key = data.key
                if (key) {
                    setUsers((prev) => {
                        const newUsers = [...prev]
                        const changedUser = newUsers.find(
                            (user) => user.id === key
                        )
                        if (changedUser) {
                            changedUser.userName = data.child('userName').val()
                            changedUser.photoURL = data.child('photoURL').val()
                        }
                        return newUsers
                    })
                }
            })
        })()

        return () => {
            usersRef.off('child_added')
            usersRef.off('child_changed')
        }
    }, [initialized])

    return [users, statuses]
}
