import * as React from 'react'
import './styles.scss'
import {
    Conversation,
    Message,
} from '../__shared__/api-responses/conversations'
import { InteractionMessage } from '../InteractionMessage'

interface Props {
    conversation?: Conversation
    newMessages: Message[]
}

function Interaction(props: Props) {
    const newestMessageRef = React.useRef<HTMLDivElement | null>(null)
    const messages = [
        ...(props.conversation?.messages ? props.conversation.messages : []),
        ...props.newMessages,
    ]

    React.useEffect(() => {
        if (newestMessageRef.current) {
            newestMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages.length])

    return (
        <div id="interaction-root">
            {messages.map((message, index) => (
                <InteractionMessage
                    key={message.id}
                    message={message}
                    newestMessageRef={
                        index === messages.length - 1
                            ? newestMessageRef
                            : undefined
                    }
                />
            ))}
        </div>
    )
}

export { Interaction }