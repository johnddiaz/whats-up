import * as React from 'react'
import firebase from 'firebase'
import {
    ServerUserStatus,
    UserStatuses,
} from '../../__shared__/types/userStatus'

export function useUserStatuses(
    initialized: boolean,
    userId: string | undefined
): UserStatuses {
    const [statuses, setStatuses] = React.useState<UserStatuses>({})

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
            const newStatuses: UserStatuses = {}

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

    return statuses
}
