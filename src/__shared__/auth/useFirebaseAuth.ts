import firebase from 'firebase'
import { useEffect, useState } from 'react'
import useLocalStorageState from '../utils/useLocalStorageState'

const config = {
    apiKey: 'AIzaSyA51jM6IryfHm1HnzmXo66QQQCcRK1ld0M',
    authDomain: 'whats-up-ce34e.firebaseapp.com',
    projectId: 'whats-up-ce34e',
    storageBucket: 'whats-up-ce34e.appspot.com',
    messagingSenderId: '6258283268',
    appId: '1:6258283268:web:91c3f62da6da184d583651',
    measurementId: 'G-K13ZDZ04JX',
}

function useFirebaseAuth(): [firebase.User | null, boolean, () => void] {
    const [user, setUser] = useLocalStorageState<firebase.User>('firebaseUser')
    const isLoggedIn = !!user
    const [githubProvider, setGithubProvider] = useState<firebase.auth.GithubAuthProvider | null>(null)

    function showSignInPopup() {
        if (!githubProvider) {
            return
        }

        firebase
            .auth()
            .signInWithPopup(githubProvider)
            .catch((error) => {
                console.error(`Unable to log in with error ${error}`)
            })
    }

    useEffect(() => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(config)
        }
        const provider = new firebase.auth.GithubAuthProvider()
        setGithubProvider(provider)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // log in
                setUser(user)
                console.log('logged in by useEffect')
            } else {
                // log out
                setUser(null)
                console.log('logged out by useEffect')
            }
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [user, isLoggedIn, showSignInPopup]
}

export default useFirebaseAuth
