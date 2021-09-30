import * as React from 'react'
import { ClientMessage } from '../../__shared__/models'
import './InteractionMessage.scss'

export interface InteractionMessageProps {
    userId: string
    message: ClientMessage
    newestMessageRef?: React.MutableRefObject<HTMLDivElement | null>
    placementClass?: string
}

export default function InteractionMessage(props: InteractionMessageProps) {
    const isSender = props.userId && props.userId === props.message.sender
    const personClass = isSender
        ? 'interactionmessage-self'
        : 'interactionmessage-friend'
    const placementClass = props.placementClass ? props.placementClass : ''

    return (
        <div
            className={placementClass}
            ref={props.newestMessageRef}
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            {!isSender && (
                <p
                    style={{
                        marginBottom: '4px',
                        textAlign: isSender ? 'right' : 'left',
                        fontSize: '12px',
                        ...(!isSender ? { marginLeft: '56px' } : null), // profile pic size + account for border radius
                    }}
                >
                    {props.message.senderName}
                </p>
            )}

            <div style={{ display: 'flex' }}>
                {!isSender && props.message.photoURL && (
                    <img
                        src={props.message.photoURL}
                        alt="profile pic"
                        style={{
                            borderRadius: '50%',
                            height: '36px',
                            width: '36px',
                            alignSelf: 'flex-end',
                            marginRight: '8px',
                        }}
                    />
                )}
                <p id="interactionmessage-text" className={personClass}>
                    {props.message.content}
                </p>
            </div>
            <p
                style={{
                    marginTop: '4px',
                    textAlign: isSender ? 'right' : 'left',
                    ...(!isSender ? { marginLeft: '56px' } : null),
                    fontSize: '10px',
                }}
            >
                {new Date(props.message.createdAt).toLocaleString()}
            </p>
        </div>
    )
}
