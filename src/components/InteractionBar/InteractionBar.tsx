import * as React from 'react'
import { ClientConversation } from '../../__shared__/hooks/useConversation'

interface Props {
    back: () => void
    backIcon: string
    conversation: ClientConversation
}

export default function InteractionBar(props: Props) {
    return (
        <div
            style={{
                width: '100%',
                height: '48px',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <button
                onClick={props.back}
                style={{
                    padding: '8px',
                    marginLeft: '16px',
                }}
            >
                {props.backIcon}
            </button>
            <h3 style={{ marginLeft: '16px' }}>{props.conversation.name}</h3>
        </div>
    )
}
