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
    const isSender = props.userId && props.userId === props.message.sender
    const personClass = isSender
        ? 'interactionmessage-self'
        : 'interactionmessage-friend'
    const placementClass = props.placementClass ? props.placementClass : ''
    console.log(props.message.createdAt)

    return (
        <div
            className={placementClass}
            ref={props.newestMessageRef}
            style={{ display: 'flex', alignItems: 'center' }}
        >
            {!isSender && props.message.photoURL && (
                <img
                    src={props.message.photoURL}
                    alt="profile pic"
                    style={{
                        borderRadius: '50%',
                        height: '36px',
                        width: '36px',
                        alignSelf: 'flex-end',
                    }}
                />
            )}
            <div style={{ marginLeft: '8px' }}>
                {!isSender && (
                    <p
                        style={{
                            marginBottom: '2px',
                            textAlign: isSender ? 'right' : 'left',
                            fontSize: '12px',
                        }}
                    >
                        {props.message.senderName}
                    </p>
                )}
                <p id="interactionmessage-text" className={personClass}>
                    {props.message.content}
                </p>
                {props.message.createdAt && (
                    <p
                        style={{
                            marginTop: '2px',
                            textAlign: isSender ? 'right' : 'left',
                            fontSize: '12px',
                        }}
                    >
                        {new Date(props.message.createdAt).toLocaleString()}
                    </p>
                )}
            </div>
        </div>
    )
}

export default InteractionMessage
