import firebase from 'firebase'
import { useEffect, useState } from 'react'
import useLocalStorageState from '../utils/useLocalStorageState'

export type SupportedAuthProvider = 'google' | 'github'

const config = {
    apiKey: 'AIzaSyA51jM6IryfHm1HnzmXo66QQQCcRK1ld0M',
    authDomain: 'whats-up-ce34e.firebaseapp.com',
    projectId: 'whats-up-ce34e',
    storageBucket: 'whats-up-ce34e.appspot.com',
    messagingSenderId: '6258283268',
    appId: '1:6258283268:web:91c3f62da6da184d583651',
    measurementId: 'G-K13ZDZ04JX',
}

export default function useFirebaseAuth(): [
    firebase.User | null,
    (method: SupportedAuthProvider) => void
] {
    const [user, setUser] = useLocalStorageState<firebase.User>('firebaseUser')
    const [
        githubProvider,
        setGithubProvider,
    ] = useState<firebase.auth.GithubAuthProvider | null>(null)
    const [
        googleProvider,
        setGoogleProvider,
    ] = useState<firebase.auth.GoogleAuthProvider | null>(null)

    function showSignInPopup(method: SupportedAuthProvider) {
        let selectedProvider
        if (method === 'github' && githubProvider) {
            selectedProvider = githubProvider
        } else if (method === 'google' && googleProvider) {
            selectedProvider = googleProvider
        } else {
            return
        }

        firebase
            .auth()
            .signInWithPopup(selectedProvider)
            .catch((error) => {
                console.error(`Unable to log in with error ${error}`)
            })
    }

    async function createUserInFirebaseIfNonexistent(user: firebase.User) {
        const snapshot = await firebase
            .database()
            .ref(`users/${user.uid}`)
            .once('value')
        if (snapshot.val()) {
            await firebase.database().ref(`users/${user.uid}`).update({
                userName: user.displayName,
                photoURL: user.photoURL,
            })
        } else {
            console.log(`User ${user.uid} does not exist. Creating now.`)
            await firebase.database().ref(`users/${user.uid}`).set({
                userName: user.displayName,
                photoURL: user.photoURL,
            })
        }
    }

    useEffect(() => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(config)
        }
        const githubProvider = new firebase.auth.GithubAuthProvider()
        const googleProvider = new firebase.auth.GoogleAuthProvider()
        setGithubProvider(githubProvider)
        setGoogleProvider(googleProvider)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // log in
                setUser(user)
                createUserInFirebaseIfNonexistent(user)
            } else {
                // log out
                setUser(null)
            }
        })
        // Don't need to worry about setUser since it's the setter from useState
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [user, showSignInPopup]
}
