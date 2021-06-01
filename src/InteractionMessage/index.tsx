import * as React from 'react'
import './styles.scss'
import { Message, Person } from '../__shared__/api-responses/conversations'

export interface InteractionMessageProps {
    message: Message
    newestMessageRef?: React.MutableRefObject<HTMLDivElement | null>
    loggedInPerson: Person
}

function InteractionMessage(props: InteractionMessageProps) {
    return (
        <div
            id="interactionmessage-root"
            className={
                props.loggedInPerson?.id === props.message.senderId
                    ? 'interactionmessage-self'
                    : 'interactionmessage-friend'
            }
            ref={props.newestMessageRef}
        >
            <p id="interactionmessage-text">{props.message.text}</p>
        </div>
    )
}

export { InteractionMessage }
