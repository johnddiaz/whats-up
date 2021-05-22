import * as React from 'react'
import './styles.scss'
import '../__shared__/styles.scss'
import Avatar from '../Avatar'
import { Conversation } from '../__shared__/api-responses/conversations'

interface Props {
    conversation: Conversation
    onPreviewClick: (id: number) => void
}

function ChatPreview(props: Props) {
    function onPreviewClick() {
        props.onPreviewClick(props.conversation.id)
    }

    return (
        <div
            id="chat-thread"
            style={{
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                padding: '16px',
                margin: '8px 16px',
                cursor: 'pointer',
            }}
            className="round-border"
            onClick={onPreviewClick}
        >
            <Avatar />
            <div
                id="textcontent"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '8px',
                }}
            >
                <h5 style={{ margin: '0' }}>{props.conversation.name}</h5>
                <p style={{ margin: '0' }}>{props.conversation.lastMessage}</p>
            </div>
        </div>
    )
}

export { ChatPreview }
