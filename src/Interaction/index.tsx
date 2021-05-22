import * as React from 'react'
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
        <div
            id="convomessagelistid"
            style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                padding: '0px 16px 0px',
            }}
        >
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
