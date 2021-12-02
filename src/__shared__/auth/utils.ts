import firebase from 'firebase'

export async function logOut() {
    return firebase.auth().signOut()
}
