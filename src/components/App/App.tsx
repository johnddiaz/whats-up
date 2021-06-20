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
import useFirebaseAuth from '../../__shared__/auth/useFirebaseAuth'

function App() {
    const [user, isSignedIn, showSignInPopup, logOut] = useFirebaseAuth()

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

        if (!loggedInPerson) {
            console.error('not logged in')
            return
        }

        const message: Message = {
            id: makeNewMessageId(),
            senderId: loggedInPerson?.id,
            senderName: loggedInPerson?.name,
            text: currentDraft,
        }

        setNewMessages((prev) => [...prev, message])
        setCurrentDraft('')
    }

    return isSignedIn ? (
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
    ) : (
        <button onClick={showSignInPopup}>Sign In</button>
    )
}

export default App
