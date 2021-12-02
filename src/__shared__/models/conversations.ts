import firebase from 'firebase'

// TODO use the interface from hook instead of copy-pasting here
interface ConversationData {
    name: string
    peopleToAdd: string[]
}

export async function createConversation(
    conversationData: ConversationData,
    user: firebase.User
): Promise<string | null> {
    const { name, peopleToAdd } = conversationData
    if (peopleToAdd.length === 0) {
        console.error('no friends to add')
        return null
    }

    try {
        const db = firebase.database()

        // Check if friendIds are valid
        const friendSnapshots = await Promise.all(
            peopleToAdd.map((personId) => {
                return db.ref(`users/${personId}`).once('value')
            })
        )

        for (let snapshot of friendSnapshots) {
            if (!snapshot.val()) {
                alert(`Friend ID ${snapshot.key} does not exist.`)
                return null
            }
        }

        // Create new conversation
        const conversationRef = await db.ref(`conversations`).push()
        const conversationId = conversationRef.key

        await conversationRef.set({
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            creatorId: user,
            name: name,
        })

        const everythingElse: Record<string, any> = {}

        // For self
        everythingElse[`userConversations/${user.uid}/${conversationId}`] = {
            invitedBy: user.uid,
        }
        everythingElse[`conversationUsers/${conversationId}/${user.uid}`] = {
            invitedBy: user.uid,
            userName: user.displayName,
        }

        // For friends
        friendSnapshots.forEach((snapshot) => {
            everythingElse[
                `userConversations/${snapshot.key}/${conversationId}`
            ] = {
                invitedBy: user.uid,
            }
            everythingElse[
                `conversationUsers/${conversationId}/${snapshot.key}`
            ] = {
                invitedBy: user.uid,
                userName: snapshot.child('userName').val() || '',
            }
        })

        await db.ref().update(everythingElse)

        return conversationId
    } catch (outerError) {
        alert(`something went wrong: ${outerError}`)
        return null
    }
}
