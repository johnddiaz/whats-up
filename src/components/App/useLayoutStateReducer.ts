import React, { useReducer, Reducer } from 'react'

export type LayoutStateActionType =
    | 'show_conversation_form'
    | 'show_user_settings'
    | 'select_conversation'
    | 'return_to_main'

interface Action {
    type: LayoutStateActionType
}

interface State {
    showConversationForm: boolean
    showUserSettings: boolean
}

function layoutStateReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'return_to_main':
            return {
                ...state,
                showConversationForm: false,
                showUserSettings: false,
            }
        case 'select_conversation':
            return {
                ...state,
                showConversationForm: false,
                showUserSettings: false,
            }
        case 'show_conversation_form':
            return {
                ...state,
                showConversationForm: true,
                showUserSettings: false,
            }
        case 'show_user_settings':
            return {
                ...state,
                showConversationForm: false,
                showUserSettings: true,
            }
        default:
            return state
    }
}

export function useLayoutStateReducer(): [State, React.Dispatch<Action>] {
    const [state, dispatch] = useReducer<Reducer<State, Action>>(
        layoutStateReducer,
        {
            showConversationForm: false,
            showUserSettings: false,
        }
    )

    return [state, dispatch]
}
