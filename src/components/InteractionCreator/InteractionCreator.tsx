import * as React from 'react'
import { useState } from 'react'
import './InteractionCreator.scss'

interface Props {
    createConversation: (friendId: string) => void
}

enum Phases {
    START = 0,
    FILL_OUT = 1,
}

function InteractionCreator(props: Props) {
    const [phase, setPhase] = useState(Phases.START)
    const [friendId, setFriendId] = useState('')

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        props.createConversation(friendId)
    }

    function renderContent() {
        switch (phase) {
            case Phases.START: {
                return (
                    <h2
                        id="InteractionCreator-starttext"
                        onClick={() => setPhase((prev) => prev + 1)}
                    >
                        {'Click here to create a new conversation'}
                    </h2>
                )
            }
            case Phases.FILL_OUT: {
                return (
                    <>
                        <label htmlFor="friend-name-input">Friend name</label>
                        <input
                            id="friend-name-input"
                            type="text"
                            value={friendId}
                            onChange={(e) => setFriendId(e.currentTarget.value)}
                        ></input>
                        <input type="submit" value="Start conversation"></input>
                    </>
                )
            }
        }
    }

    return (
        <div id="InteractionCreator-root">
            <form onSubmit={handleSubmit}>{renderContent()}</form>
        </div>
    )
}

export default InteractionCreator
export type { Props as InteractionCreatorProps }
