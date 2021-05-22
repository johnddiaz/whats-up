import * as React from 'react'
import {
    Conversation,
    Message,
    Person,
} from '../__shared__/api-responses/conversations'
import { ConvoMessageList } from '../ConvoMessageList'
import ConvoMessageEditor from '../ConvoMessageEditor'

interface Props {
    loggedInPerson: Person | undefined
    children?: React.ReactNode
    conversation?: Conversation
}

function ConvoView(props: Props) {
    const [currentDraft, setCurrentDraft] = React.useState('')
    const [newMessages, setNewMessages] = React.useState<Message[]>([])

    function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setCurrentDraft(e.target.value)
    }

    function makeNewMessageId(): number {
        let lastId: number

        if (newMessages.length === 0) {
            const messages = props.conversation?.messages
            lastId = messages ? messages[messages.length - 1].id : 0
        } else {
            lastId = newMessages[newMessages.length - 1].id
        }

        return lastId + 1
    }

    function handleSend(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault()

        if (!props.loggedInPerson) {
            console.error('not logged in')
            return
        }

        const message: Message = {
            id: makeNewMessageId(),
            senderId: props.loggedInPerson?.id,
            senderName: props.loggedInPerson?.name,
            text: currentDraft,
        }

        setNewMessages((prev) => [...prev, message])
        setCurrentDraft('')
    }

    return (
        <div
            id="convoviewdiv"
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
            <ConvoMessageEditor
                currentDraft={currentDraft}
                handleMessageChange={handleMessageChange}
                handleSend={handleSend}
            />
        </div>
    )
}

export { ConvoView }
