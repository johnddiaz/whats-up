import React, { useState } from 'react'
import './styles.scss'
import '../../__shared__/styles.scss'
import ChatPreview from '../ChatPreview'
import ChatsToolbar from '../ChatsToolbar'
import {
    Conversation,
    conversations,
    john,
    Message,
} from '../../__shared__/api-responses/conversations'
import Interaction from '../Interaction'
import InteractionMessageEditor from '../InteractionMessageEditor'
import { ChatsLayout, InteractionLayout } from './layouts'
import withAuth from '../../__shared__/auth/withAuth'
import firebase from 'firebase'

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
        if (convo) {
            setCurrentConvo(convo)
        }
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
            <ChatsLayout>
                <ChatsToolbar />
                {conversations.map((convo) => (
                    <ChatPreview
                        key={convo.id}
                        conversation={convo}
                        onPreviewClick={handlePreviewSelect}
                    />
                ))}
            </ChatsLayout>
            <InteractionLayout>
                {/* Header */}
                <Interaction
                    conversation={currentConvo}
                    newMessages={newMessages}
                />
                <InteractionMessageEditor
                    currentDraft={currentDraft}
                    handleMessageChange={handleMessageChange}
                    handleSend={handleSend}
                />
            </InteractionLayout>
        </div>
    )
}

export default withAuth(App)
