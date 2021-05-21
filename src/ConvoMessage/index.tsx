import * as React from 'react'
import { Message } from '../__shared__/api-responses/conversations'
import { LoggedInPersonContext } from '../__shared__/utils/context'

interface Props {
    message: Message
    newestMessageRef: React.MutableRefObject<HTMLDivElement | null> | undefined
}

function ConvoMessage (props: Props) {
    const loggedInPerson = React.useContext(LoggedInPersonContext)

    const personSpecificStyles =
        loggedInPerson?.id === props.message.senderId
            ? {
                  marginLeft: '32px',
                  alignSelf: 'end',
                  backgroundColor: 'black',
                  color: 'white',
              }
            : {
                  marginRight: '32px',
                  alignSelf: 'start',
                  backgroundColor: 'white',
                  color: 'black',
              }
    return (
        <div
            ref={props.newestMessageRef}
            style={{
                display: 'flex',
                border: '1px solid black',
                borderRadius: '24px',
                padding: '8px',
                marginBottom: '16px',
                ...personSpecificStyles,
            }}
        >
            <p
                style={{
                    margin: 0,
                    overflowWrap: 'anywhere',
                }}
            >
                {props.message.text}
            </p>
        </div>
    )
}

export { ConvoMessage }
