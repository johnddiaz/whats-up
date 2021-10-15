import React, { useReducer, Reducer } from 'react'

type ActionType = 'set_conversation_name' | 'toggle_person'

interface Action {
    type: ActionType
    payload: string
}

interface State {
    newConversationName: string
    peopleForNewConversation: string[]
}

function conversationFormReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'set_conversation_name':
            return {
                ...state,
                newConversationName: action.payload,
            }
        case 'toggle_person':
            if (state.peopleForNewConversation.includes(action.payload)) {
                return {
                    ...state,
                    peopleForNewConversation: state.peopleForNewConversation.filter(
                        (person) => person !== action.payload
                    ),
                }
            } else {
                return {
                    ...state,
                    peopleForNewConversation: [
                        ...state.peopleForNewConversation,
                        action.payload,
                    ],
                }
            }
        default:
            return state
    }
}

export function useConversationFormReducer(): [State, React.Dispatch<Action>] {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
        conversationFormReducer,
        {
            newConversationName: '',
            peopleForNewConversation: [],
        }
    )

    return [state, dispatch]
}

export type { State as ConversationFormState }
export type { Action as ConversationFormAction }
