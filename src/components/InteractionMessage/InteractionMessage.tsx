import * as React from 'react'
import { ClientMessage } from '../../__shared__/models'
import { ClientUserStatus } from '../../__shared__/types/userStatus'
import Avatar from '../Avatar'
import './InteractionMessage.scss'

export interface InteractionMessageProps {
    isSender: boolean
    userStatus: ClientUserStatus | undefined
    message: ClientMessage
    avatar: JSX.Element | null
    showName?: boolean
    squishAbove?: boolean
    squishBelow?: boolean
    styles?: React.CSSProperties
    newestMessageRef?: React.MutableRefObject<HTMLDivElement | null>
    placementClass?: string
    marginTop?: string
}

export default function InteractionMessage(props: InteractionMessageProps) {
    const [showTime, setShowTime] = React.useState(false)

    const personClass = props.isSender
        ? 'interactionmessage-self'
        : 'interactionmessage-friend'
    const placementClass = props.placementClass ? props.placementClass : ''

    const borderStyling: React.CSSProperties = {}
    if (props.squishAbove) {
        const property = props.isSender
            ? 'borderTopRightRadius'
            : 'borderTopLeftRadius'
        borderStyling[property] = '3px'
    }
    if (props.squishBelow) {
        const property = props.isSender
            ? 'borderBottomRightRadius'
            : 'borderBottomLeftRadius'
        borderStyling[property] = '3px'
    }

    return (
        <div
            className={placementClass}
            ref={props.newestMessageRef}
            style={{
                display: 'flex',
                flexDirection: 'column',
                ...(props.marginTop
                    ? { marginTop: props.marginTop }
                    : undefined),
            }}
        >
            {props.showName && !props.isSender && (
                <p
                    style={{
                        marginBottom: '2px',
                        marginTop: '0px',
                        textAlign: props.isSender ? 'right' : 'left',
                        fontSize: '12px',
                        ...(!props.isSender ? { marginLeft: '56px' } : null), // profile pic size + account for border radius
                    }}
                >
                    {props.message.senderName}
                </p>
            )}

            <div
                style={{
                    display: 'flex',
                    alignSelf: props.isSender ? 'flex-end' : 'flex-start',
                }}
            >
                {!props.isSender && (
                    <div
                        style={{
                            marginRight: '8px',
                            height: '36px',
                            width: '36px',
                        }}
                    >
                        {props.avatar}
                    </div>
                )}
                <p
                    id="interactionmessage-text"
                    className={personClass}
                    style={{ ...borderStyling }}
                    onClick={() => setShowTime((prev) => !prev)}
                >
                    {props.message.content}
                </p>
            </div>
            {showTime && (
                <p
                    style={{
                        marginTop: '4px',
                        textAlign: props.isSender ? 'right' : 'left',
                        ...(!props.isSender
                            ? { marginLeft: '56px' }
                            : { marginRight: '12px' }),
                        fontSize: '10px',
                        marginBottom: '0px',
                    }}
                >
                    {new Date(props.message.createdAt).toLocaleString()}
                </p>
            )}
        </div>
    )
}
