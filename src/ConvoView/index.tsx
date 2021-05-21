import * as React from 'react'
import {
    Conversation,
    Message,
} from '../__shared__/api-responses/conversations'
import { LoggedInPersonContext } from '../__shared__/utils/context'
import { ConvoMessageList } from '../ConvoMessageList'

interface Props {
    conversation?: Conversation
}

function ConvoView (props: Props) {
    const loggedInPerson = React.useContext(LoggedInPersonContext)
    const [currentDraft, setCurrentDraft] = React.useState('')
    const [newMessages, setNewMessages] = React.useState<Message[]>([])
    function handleMessageChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setCurrentDraft(e.target.value)
    }

    function makeNewMessageId (): number {
        let lastId: number

        if (newMessages.length === 0) {
            const messages = props.conversation?.messages
            lastId = messages ? messages[messages.length - 1].id : 0
        } else {
            lastId = newMessages[newMessages.length - 1].id
        }

        return lastId + 1
    }

    function handleSend (e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault()

        if (!loggedInPerson) {
            console.error('not logged in')
            return
        }

        const message: Message = {
            id: makeNewMessageId(),
            senderId: loggedInPerson?.id,
            senderName: loggedInPerson?.name,
            text: currentDraft,
        }

        setNewMessages(prev => [...prev, message])
        setCurrentDraft('')
    }

    return (
        <div
            id='convoviewdiv'
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: 'grey',
                flexGrow: 3,
                flexBasis: 0,
            }}
        >
            <ConvoMessageList
                conversation={props.conversation}
                newMessages={newMessages}
            />
            <div
                id='convomessageeditor'
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    border: '1px solid black',
                }}
            >
                <textarea
                    style={
                        {
                            // borderRadius: '24px',
                        }
                    }
                    onChange={handleMessageChange}
                    value={currentDraft}
                />
                <input type='button' value='Send' onClick={handleSend} />
            </div>
        </div>
    )
}

export { ConvoView }
