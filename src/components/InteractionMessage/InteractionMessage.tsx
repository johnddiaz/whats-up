import * as React from 'react'
import { ClientMessage } from '../../__shared__/models'
import { ClientUserStatus } from '../../__shared__/types/userStatus'
import Avatar from '../Avatar'
import './InteractionMessage.scss'

export interface InteractionMessageProps {
    userId: string
    userStatus: ClientUserStatus | undefined
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

            <div
                style={{
                    display: 'flex',
                    alignSelf: isSender ? 'flex-end' : 'flex-start',
                }}
            >
                {!isSender && props.message.photoURL && (
                    <Avatar
                        photoURL={props.message.photoURL}
                        badgeState={props.userStatus?.state}
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
                    ...(!isSender
                        ? { marginLeft: '56px' }
                        : { marginRight: '12px' }),
                    fontSize: '10px',
                }}
            >
                {new Date(props.message.createdAt).toLocaleString()}
            </p>
        </div>
    )
}
