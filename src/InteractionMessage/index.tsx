import * as React from 'react'
import './styles.scss'
import {
    john,
    Message,
    Person,
} from '../__shared__/api-responses/conversations'

interface Props {
    message: Message
    newestMessageRef: React.MutableRefObject<HTMLDivElement | null> | undefined
}

function InteractionMessage(props: Props) {
    const loggedInPerson: Person = john

    return (
        <div
            id="interactionmessage-root"
            className={
                loggedInPerson?.id === props.message.senderId
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
