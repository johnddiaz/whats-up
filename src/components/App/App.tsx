import React, { useState } from 'react'
import './styles.scss'
import '../../__shared__/styles.scss'
import ChatPreview from '../ChatPreview'
import HomeToolbar from '../ChatsToolbar'
import {
    Conversation,
    conversations,
    john,
    Message,
} from '../../__shared__/api-responses/conversations'
import Interaction from '../Interaction'
import InteractionMessageEditor from '../InteractionMessageEditor'
import { ChatsLayout as HomeLayout, InteractionLayout } from './layouts'
import withAuth from '../../__shared__/auth/withAuth'
import firebase from 'firebase'
import InteractionCreator from '../InteractionCreator'

interface AppProps {
    user: firebase.User | null
}

function App(props: AppProps) {
    const [currentConvo, setCurrentConvo] = useState<Conversation | undefined>()
    const loggedInPerson = john

    const [currentDraft, setCurrentDraft] = React.useState('')
    const [newMessages, setNewMessages] = React.useState<Message[]>([])

    function handlePreviewSelect(id: number) {
        const convo = conversations.find((convo) => convo.id === id)
        setCurrentConvo(convo || undefined)
    }

    function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setCurrentDraft(e.target.value)
    }

    function makeNewMessageId(): number {
        let lastId: number

        if (newMessages.length === 0) {
            const messages = currentConvo?.messages
            lastId = messages ? messages[messages.length - 1].id : 0
        } else {
            lastId = newMessages[newMessages.length - 1].id
        }

        return lastId + 1
    }

    async function createConversation(friendId: string) {
        if (!loggedInPerson || !props.user) {
            console.error('not logged in')
            return
        }

        try {
            const db = firebase.database()

            // Check if friendId is valid
            const snapshot = await db.ref(`users/${friendId}`).once('value')
            if (!snapshot.val()) {
                alert(`Friend ID ${friendId} does not exist.`)
                return
            }

            // Create new conversation
            const conversationRef = await db.ref(`conversations`).push()
            const conversationId = conversationRef.key
            alert(`Created conversation ${conversationId}`)
            await conversationRef.set({
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                creatorId: props.user.uid,
            })
            alert('Set successful')

            const everythingElse: Record<string, any> = {}

            // For self
            everythingElse[
                `userConversations/${props.user.uid}/${conversationId}`
            ] = true
            everythingElse[
                `conversationUsers/${conversationId}/${props.user.uid}`
            ] = true

            // For friend
            everythingElse[`userInvitations/${conversationId}/${friendId}`] = {
                invitedBy: props.user.uid,
            }

            await db.ref().update(everythingElse)
        } catch (outerError) {
            alert(`something went wrong: ${outerError}`)
        }
    }

    function handleSend(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault()

        if (!loggedInPerson || !props.user) {
            console.error('not logged in')
            return
        }

        const message: Message = {
            id: makeNewMessageId(),
            senderId: loggedInPerson?.id,
            senderName: loggedInPerson?.name,
            text: currentDraft,
        }

        const messagesRef = firebase
            .database()
            .ref(`users/${props.user.uid}/messages`)
        const newMessageRef = messagesRef.push()
        newMessageRef.set(
            {
                // TODO have firebase add the sender programmatically based on auth token
                sender: props.user.uid,
                content: message.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                updatedAt: firebase.database.ServerValue.TIMESTAMP,
            },
            (error) => {
                if (error) {
                    alert(`something went wrong... ${error}`)
                } else {
                    setNewMessages((prev) => [...prev, message])
                    setCurrentDraft('')
                }
            }
        )
    }

    function logOut() {
        firebase
            .auth()
            .signOut()
            .catch((e) => {
                window.alert(`Unable to sign out with error ${e}`)
            })
    }

    return (
        <div id="app-root">
            <button onClick={logOut}>Log Out</button>
            <HomeLayout>
                <HomeToolbar />
                {conversations.map((convo) => (
                    <ChatPreview
                        key={convo.id}
                        conversation={convo}
                        onPreviewClick={handlePreviewSelect}
                    />
                ))}
            </HomeLayout>
            <InteractionLayout>
                {/* Header */}
                {currentConvo ? (
                    <>
                        <Interaction
                            conversation={currentConvo}
                            newMessages={newMessages}
                        />
                        <InteractionMessageEditor
                            currentDraft={currentDraft}
                            handleMessageChange={handleMessageChange}
                            handleSend={handleSend}
                        />
                    </>
                ) : (
                    <InteractionCreator
                        createConversation={createConversation}
                    />
                )}
            </InteractionLayout>
        </div>
    )
}

export default withAuth(App)
