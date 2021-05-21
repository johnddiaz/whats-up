import * as React from 'react'
import { Conversation, Message } from '../../shared/api-responses/conversations'
import { ConvoMessage } from '../ConvoMessage'

interface Props {
    conversation?: Conversation
    newMessages: Message[]
}

function ConvoMessageList (props: Props) {
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
            id='convomessagelistid'
            style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                padding: '0px 16px 0px',
            }}
        >
            {messages.map((message, index) => (
                <ConvoMessage
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

export { ConvoMessageList }
