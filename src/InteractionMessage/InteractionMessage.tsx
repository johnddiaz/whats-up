import * as React from 'react'
import './styles.scss'
import { Message, Person } from '../__shared__/api-responses/conversations'

export interface InteractionMessageProps {
    message: Message
    newestMessageRef?: React.MutableRefObject<HTMLDivElement | null>
    loggedInPerson: Person
    placementClass?: string
}

function InteractionMessage(props: InteractionMessageProps) {
    const personClass =
        props.loggedInPerson.id === props.message.senderId
            ? 'interactionmessage-self'
            : 'interactionmessage-friend'
    const placementClass = props.placementClass ? props.placementClass : ''

    return (
        <div
            id="interactionmessage-root"
            className={`${personClass} ${placementClass}`}
            ref={props.newestMessageRef}
        >
            <p id="interactionmessage-text">{props.message.text}</p>
        </div>
    )
}

export default InteractionMessage
