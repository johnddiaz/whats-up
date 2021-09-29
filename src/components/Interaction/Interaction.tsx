import * as React from 'react'
import './Interaction.scss'
import {
    Conversation,
    john,
    Message,
} from '../../__shared__/api-responses/conversations'
import InteractionMessage from '../InteractionMessage'
import {
    ClientConversation,
    ClientMessage,
} from '../../__shared__/hooks/useConversation'

interface InteractionProps {
    userId: string
    conversation: ClientConversation
    messages: ClientMessage[]
}

function Interaction(props: InteractionProps) {
    const newestMessageRef = React.useRef<HTMLDivElement | null>(null)

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

export default Interaction
export type { InteractionProps }
