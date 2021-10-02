import * as React from 'react'
import './Interaction.scss'
import InteractionMessage from '../InteractionMessage'
import { ClientConversation, ClientMessage } from '../../__shared__/models'
import { ClientUserStatuses } from '../../__shared__/types/userStatus'

interface Props {
    userId: string
    conversation: ClientConversation
    messages: ClientMessage[]
    statuses: ClientUserStatuses
}

export default function Interaction(props: Props) {
    const newestMessageRef = React.useRef<HTMLDivElement | null>(null)
    console.log(props.statuses)

    React.useEffect(() => {
        if (newestMessageRef.current) {
            newestMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [props.messages.length])

    return (
        <div id="interaction-root">
            {props.messages.map((message, index) => (
                <React.Fragment key={message.id}>
                    <InteractionMessage
                        key={message.id}
                        message={message}
                        newestMessageRef={
                            index === props.messages.length - 1
                                ? newestMessageRef
                                : undefined
                        }
                        userId={props.userId}
                        userStatus={props.statuses[message.sender]}
                        placementClass={
                            props.userId && props.userId === message.sender
                                ? 'interactionmessage-placement-self'
                                : 'interactionmessage-placement-friend'
                        }
                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export type { Props as InteractionProps }
