import React, { useState } from 'react'
import './styles.css'
import '../__shared__/styles.scss'
import { ConvoPreview } from '../ConvoPreview'
import { ConvoPreviewListToolbar } from '../ConvoPreviewListToolbar'
import {
    Conversation,
    conversations,
    john,
} from '../__shared__/api-responses/conversations'
import { ConvoView } from '../ConvoView'

function ConvosLayout(props: { children: React.ReactNode }) {
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

function ConvoInteractionLayout(props: { children: JSX.Element }) {
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

    function handlePreviewSelect(id: number) {
        const convo = conversations.find((convo) => convo.id === id)
        if (convo) {
            setCurrentConvo(convo)
        }
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
            <ConvosLayout>
                <ConvoPreviewListToolbar />
                {conversations.map((convo) => (
                    <ConvoPreview
                        key={convo.id}
                        conversation={convo}
                        onPreviewClick={handlePreviewSelect}
                    />
                ))}
            </ConvosLayout>
            <ConvoInteractionLayout>
                <ConvoView
                    loggedInPerson={loggedInPerson}
                    conversation={currentConvo}
                />
            </ConvoInteractionLayout>
        </div>
    )
}

export default App
