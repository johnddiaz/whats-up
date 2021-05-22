import React, { useState } from 'react'
import './styles.css'
import '../__shared__/styles.scss'
import { ConvoPreview } from '../ConvoPreview'
import { ConvoPreviewListToolbar } from '../ConvoPreviewListToolbar'
import {
    Conversation,
    conversations,
    john,
    Message,
} from '../__shared__/api-responses/conversations'
import { Interaction } from '../Interaction'
import ConvoMessageEditor from '../ConvoMessageEditor'

function ChatsLayout(props: { children: React.ReactNode }) {
    return (
        <div
            id="chat thread list"
            style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                flexBasis: 0,
            }}
        >
            {props.children}
        </div>
    )
}

function InteractionLayout(props: { children: React.ReactNode }) {
    return (
        <div
            id="convoviewdiv"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'grey',
                flexGrow: 3,
                flexBasis: 0,
            }}
        >
            {props.children}
        </div>
    )
}

function App() {
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

    return (
        <div
            id="parent"
            style={{
                display: 'flex',
                height: '100%',
                padding: '32px',
                boxSizing: 'border-box',
            }}
        >
            <ChatsLayout>
                <ConvoPreviewListToolbar />
                {conversations.map((convo) => (
                    <ConvoPreview
                        key={convo.id}
                        conversation={convo}
                        onPreviewClick={handlePreviewSelect}
                    />
                ))}
            </ChatsLayout>
            <InteractionLayout>
                <Interaction
                    conversation={currentConvo}
                    newMessages={newMessages}
                />
                <ConvoMessageEditor
                    currentDraft={currentDraft}
                    handleMessageChange={handleMessageChange}
                    handleSend={handleSend}
                />
            </InteractionLayout>
        </div>
    )
}

export default App
