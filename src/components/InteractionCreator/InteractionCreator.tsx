import * as React from 'react'
import { useState } from 'react'
import './InteractionCreator.scss'

interface Props {
    createConversation: (friendId: string, name: string) => void
    back: () => void
}

function InteractionCreator(props: Props) {
    const [conversationName, setConversationName] = useState('')
    const [friendId, setFriendId] = useState('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.createConversation(friendId, conversationName)
    }

    return (
        <div id="InteractionCreator-root">
            <button onClick={props.back} style={{ padding: '8px' }}>
                X
            </button>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90%',
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '8px',
                    }}
                >
                    <div style={{ display: 'flex', padding: '4px' }}>
                        <label
                            htmlFor="conversation-name-input"
                            style={{ flexGrow: 1, marginRight: '8px' }}
                        >
                            Conversation Name
                        </label>
                        <input
                            id="conversation-name-input"
                            type="text"
                            value={conversationName}
                            onChange={(e) =>
                                setConversationName(e.currentTarget.value)
                            }
                        ></input>
                    </div>
                    <div style={{ display: 'flex', padding: '4px' }}>
                        <label
                            htmlFor="friend-name-input"
                            style={{ flexGrow: 1, marginRight: '8px' }}
                        >
                            Friend ID
                        </label>
                        <input
                            id="friend-name-input"
                            type="text"
                            value={friendId}
                            onChange={(e) => setFriendId(e.currentTarget.value)}
                        ></input>
                    </div>

                    <input
                        type="submit"
                        value="Start conversation"
                        style={{ margin: '4px' }}
                    ></input>
                </form>
            </div>
        </div>
    )
}

export default InteractionCreator
export type { Props as InteractionCreatorProps }
