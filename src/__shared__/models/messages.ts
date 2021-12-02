import firebase from 'firebase'

export async function createMessage(
    user: firebase.User,
    messageText: string,
    conversationId: string
) {
    const message = {
        sender: user.uid,
        senderName: user.displayName || '',
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        content: messageText,
        photoURL: user.photoURL,
    }
    const newMessageRef = await firebase
        .database()
        .ref(`messages/${conversationId}`)
        .push()
    return newMessageRef.set(message)
}
