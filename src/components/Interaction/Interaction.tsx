import * as React from 'react'
import './Interaction.scss'
import InteractionMessage from '../InteractionMessage'
import { ClientConversation, ClientMessage } from '../../__shared__/models'
import { ClientUserStatuses } from '../../__shared__/types/userStatus'
import Avatar from '../Avatar'

interface MessageStyling {
    squishAbove: {
        [messageId: string]: boolean
    }
    squishBelow: {
        [messageId: string]: boolean
    }
    messagesWithoutAvatar: {
        [messageId: string]: boolean
    }
    marginTop: {
        [messageId: string]: string
    }
}

interface Props {
    userId: string
    conversation: ClientConversation
    messages: ClientMessage[]
    statuses: ClientUserStatuses
}

export default function Interaction(props: Props) {
    const newestMessageRef = React.useRef<HTMLDivElement | null>(null)

    React.useEffect(() => {
        if (newestMessageRef.current) {
            newestMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [props.messages.length])

    /**
     * Calculates which message ids (and in turn, the InteractionMessage) will need
     * to be styled differently with a squished effect.
     */
    function calculateMessageStyling(): MessageStyling {
        const styling: MessageStyling = {
            squishAbove: {},
            squishBelow: {},
            messagesWithoutAvatar: {},
            marginTop: {},
        }

        return props.messages.reduce(
            (previousStyling, currentMessage, index, arr) => {
                const currentMessageSeconds =
                    Number.parseInt(currentMessage.createdAt) / 1000
                // Look behind - only when there is a previous message for same user
                if (index > 0) {
                    if (arr[index - 1].sender === currentMessage.sender) {
                        const previousMessageTime = arr[index - 1].createdAt
                        const secondsBetweenLastMessage =
                            currentMessageSeconds -
                            Number.parseInt(previousMessageTime) / 1000
                        if (secondsBetweenLastMessage < 60) {
                            previousStyling.squishAbove[
                                currentMessage.id
                            ] = true
                            previousStyling.marginTop[currentMessage.id] = '1px'
                        } else {
                            previousStyling.marginTop[currentMessage.id] =
                                '12px'
                        }
                    } else {
                        previousStyling.marginTop[currentMessage.id] = '30px'
                    }
                }
                // Look ahead - only when a next message exists for same user
                if (
                    arr.length > 0 &&
                    index < arr.length - 1 &&
                    arr[index + 1].sender === currentMessage.sender
                ) {
                    const nextMessageTime = arr[index + 1].createdAt
                    const secondsBetweenNextMessage =
                        Number.parseInt(nextMessageTime) / 1000 -
                        currentMessageSeconds
                    if (secondsBetweenNextMessage < 60) {
                        previousStyling.squishBelow[currentMessage.id] = true
                        previousStyling.messagesWithoutAvatar[
                            currentMessage.id
                        ] = true
                    }
                }
                return previousStyling
            },
            styling
        )
    }

    function renderMessagesTimeline() {
        const styling = calculateMessageStyling()
        return props.messages.map((message, index, arr) => {
            const isSender = !!(props.userId && props.userId === message.sender)
            const userStatus = props.statuses[message.sender]
            const currentDate = new Date(message.createdAt)
            let showTimelineAboveMessage: boolean = false

            // show timeline if current message is first in the list,
            // or if the previous message is a different day tha the current message
            // or if the previous message is 3 or more hours since the current message

            if (index === 0) {
                showTimelineAboveMessage = true
            } else {
                const pastDate = new Date(arr[index - 1].createdAt)
                const threeHours = 3 * 60 * 60 * 1000
                showTimelineAboveMessage =
                    index === 0 ||
                    pastDate.toDateString() !== currentDate.toDateString() ||
                    pastDate.getTime() >= currentDate.getTime() + threeHours
            }

            return (
                <>
                    {showTimelineAboveMessage && (
                        <p
                            style={{
                                textAlign: 'center',
                                marginTop: '30px',
                                marginBottom: '8px',
                            }}
                        >
                            {currentDate.toDateString()}
                        </p>
                    )}
                    <InteractionMessage
                        key={message.id}
                        message={message}
                        newestMessageRef={
                            index === props.messages.length - 1
                                ? newestMessageRef
                                : undefined
                        }
                        isSender={isSender}
                        userStatus={userStatus}
                        avatar={
                            !isSender &&
                            message.photoURL &&
                            !styling.messagesWithoutAvatar[message.id] ? (
                                <Avatar
                                    photoURL={message.photoURL}
                                    badgeState={userStatus.state}
                                />
                            ) : null
                        }
                        squishAbove={styling.squishAbove[message.id]}
                        squishBelow={styling.squishBelow[message.id]}
                        showName={!styling.squishAbove[message.id]}
                        placementClass={
                            props.userId && props.userId === message.sender
                                ? 'interactionmessage-placement-self'
                                : 'interactionmessage-placement-friend'
                        }
                        marginTop={styling.marginTop[message.id]}
                    />
                </>
            )
        })
    }

    return <div id="interaction-root">{renderMessagesTimeline()}</div>
}

export type { Props as InteractionProps }
