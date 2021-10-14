import * as React from 'react'
import { ClientConversation } from '../../__shared__/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface Props {
    back: () => void
    backIcon: string
    conversation: ClientConversation
}

export default function InteractionBar(props: Props) {
    return (
        <header
            style={{
                width: '100%',
                height: '56px',
                backgroundColor: 'black',
                color: 'white',
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                boxShadow: '0px 2px 12px 0px #000000',
            }}
        >
            <div
                onClick={props.back}
                style={{
                    display: 'flex',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '5px',
                    marginLeft: '16px',
                    cursor: 'pointer',
                    padding: '8px 8px 8px 0',
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft} size={'lg'} />
            </div>
            <h3 style={{ marginLeft: '8px' }}>{props.conversation.name}</h3>
        </header>
    )
}
