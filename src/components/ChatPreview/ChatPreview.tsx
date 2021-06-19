import * as React from 'react'
import './ChatPreview.scss'
import '../../__shared__/styles.scss'
import Avatar from '../Avatar'
import { Conversation } from '../../__shared__/api-responses/conversations'

interface Props {
    conversation: Conversation
    onPreviewClick: (id: number) => void
}

function ChatPreview(props: Props) {
    const messages = props.conversation.messages
    const lastMessage =
        messages && messages.length > 0
            ? messages[messages.length - 1]
            : undefined

    function onPreviewClick() {
        props.onPreviewClick(props.conversation.id)
    }

    return (
        <div id="chatpreview-root" onClick={onPreviewClick}>
            <Avatar size="sm" />
            <div id="chatpreview-text-root">
                <h5 style={{ margin: '0' }}>
                    {props.conversation.participants[0].name}
                </h5>
                <p style={{ margin: '0' }}>{lastMessage?.text}</p>
            </div>
        </div>
    )
}

export default ChatPreview
