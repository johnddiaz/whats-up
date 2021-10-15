import * as React from 'react'
import { ClientConversation } from '../../__shared__/models'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'

interface Props {
    back: () => void
    backIcon: string
    conversation: ClientConversation
}

export default function InteractionBar(props: Props) {
    return (
        <Header>
            <div
                onClick={props.back}
                style={{
                    display: 'flex',
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    padding: '8px 8px 8px 0',
                }}
            >
                <FontAwesomeIcon icon={faArrowLeft} size={'lg'} />
            </div>
            <h3 style={{ marginLeft: '8px' }}>{props.conversation.name}</h3>
        </Header>
    )
}
