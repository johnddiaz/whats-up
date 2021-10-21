import * as React from 'react'
import { ClientUser } from '../../__shared__/types/user'
import { ClientUserStatuses } from '../../__shared__/types/userStatus'
import {
    ConversationFormAction,
    ConversationFormState,
} from '../App/useConversationFormReducer'
import Avatar from '../Avatar'
import './InteractionCreator.scss'

interface Props {
    userId: string | undefined
    users: ClientUser[]
    userStatuses: ClientUserStatuses
    formState: ConversationFormState
    dispatchForm: React.Dispatch<ConversationFormAction>
}

export default function InteractionCreator(props: Props) {
    function handlePersonSelect(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        props.dispatchForm({
            type: 'toggle_person',
            payload: e.target.dataset.personid as string,
        })
    }

    return (
        <div id="InteractionCreator-root">
            <h4 style={{ marginTop: '0' }}>
                Choose a conversation name (optional)
            </h4>
            <input
                id="conversation-name-input"
                type="text"
                value={props.formState.newConversationName}
                onChange={(e) =>
                    props.dispatchForm({
                        type: 'set_conversation_name',
                        payload: e.currentTarget.value,
                    })
                }
            ></input>

            <h4>Select people to add *</h4>
            <div>
                {props.users
                    .filter((user) => user.id !== props.userId)
                    .map((user) => {
                        return (
                            <div
                                key={`pselect-${user.id}`}
                                className={'hover'}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'left',
                                    alignItems: 'center',
                                    minWidth: '20px',
                                    userSelect: 'none',
                                    padding: '8px 16px',
                                    border: '1px solid #737373',
                                    borderRadius: '3px',
                                    marginTop: '8px',
                                    backgroundColor: props.formState.peopleForNewConversation.includes(
                                        user.id
                                    )
                                        ? '#696969'
                                        : undefined,
                                }}
                                data-personid={user.id}
                                // @ts-ignore
                                onClick={handlePersonSelect}
                            >
                                {user.photoURL && (
                                    <Avatar
                                        photoURL={user.photoURL}
                                        badgeState={
                                            props.userStatuses[user.id].state
                                        }
                                        style={{
                                            marginRight: '8px',
                                        }}
                                    />
                                )}
                                {user.userName}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export type { Props as InteractionCreatorProps }
