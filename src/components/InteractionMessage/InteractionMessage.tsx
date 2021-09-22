import * as React from 'react'
import './InteractionMessage.scss'
import { Message, Person } from '../../__shared__/api-responses/conversations'
import { ClientMessage } from '../../__shared__/hooks/useConversation'

export interface InteractionMessageProps {
    userId: string
    message: ClientMessage
    newestMessageRef?: React.MutableRefObject<HTMLDivElement | null>
    placementClass?: string
}

function InteractionMessage(props: InteractionMessageProps) {
    const personClass =
        props.userId && props.userId === props.message.sender
            ? 'interactionmessage-self'
            : 'interactionmessage-friend'
    const placementClass = props.placementClass ? props.placementClass : ''

    return (
        <div
            id="interactionmessage-root"
            className={`${personClass} ${placementClass}`}
            ref={props.newestMessageRef}
        >
            <p id="interactionmessage-text">{props.message.content}</p>
        </div>
    )
}

export default InteractionMessage
