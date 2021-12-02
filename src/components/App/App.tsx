import React from 'react'
import './styles.scss'
import '../../__shared__/styles.scss'
import ChatPreview from '../ChatPreview'
import HomeToolbar from '../HomeHeader'
import Interaction from '../Interaction'
import InteractionMessageEditor from '../InteractionMessageEditor'
import { ChatsLayout as HomeLayout, InteractionLayout } from './layouts'
import withAuth from '../../__shared__/auth/withAuth'
import firebase from 'firebase'
import InteractionCreator from '../InteractionCreator'
import { useConversation } from '../../__shared__/hooks/useConversation'
import { useWindowSize } from '../../__shared__/hooks/useWindowSize'
import InteractionBar from '../InteractionBar'
import { UserSettings } from '../UserSettings'
import { ClientConversation } from '../../__shared__/models'
import {
    LayoutStateActionType,
    useLayoutStateReducer,
} from './useLayoutStateReducer'
import { useUsers } from './useUsers'
import BottomSettings from '../BottomSettings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import { useConversationFormReducer } from './useConversationFormReducer'
import { createConversation } from '../../__shared__/models/conversations'
import { createMessage } from '../../__shared__/models/messages'
import { logOut } from '../../__shared__/auth/utils'

type ConversationIdDispatchValue<
    T extends LayoutStateActionType
> = T extends 'select_conversation'
    ? {
          conversationId: string
      }
    : {
          conversationId?: never
      }

type DispatchWithConversationAction<T extends LayoutStateActionType> = {
    type: T
} & ConversationIdDispatchValue<T>

interface AppProps {
    user: firebase.User | null
}

/*
What should be moved elsewhere?
- Functions that interact with firebase (create conversation, create message, logout, update user profile)
- 
 */

function App(props: AppProps) {
    const appInitiated = firebase.apps.length > 0

    const {
        messages,
        conversations,
        conversationId,
        setConversationId,
    } = useConversation(appInitiated, props.user?.uid)
    const currentConversation = conversationId
        ? (conversations.find(
              (c) => c.id === conversationId
          ) as ClientConversation)
        : null

    const [users, userStatuses] = useUsers(appInitiated, props.user?.uid)

    const windowSize = useWindowSize()

    const [currentDraft, setCurrentDraft] = React.useState('')

    const [layoutState, layoutStateDispatch] = useLayoutStateReducer()

    const [
        conversationFormState,
        dispatchConversationForm,
    ] = useConversationFormReducer()

    function handlePreviewSelect(id: string) {
        dispatchWithConversationId({
            type: 'select_conversation',
            conversationId: id,
        })
    }

    function dispatchWithConversationId<T extends LayoutStateActionType>(
        action: DispatchWithConversationAction<T>
    ) {
        layoutStateDispatch({ type: action.type })
        setConversationId(action.conversationId || null)
    }

    function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setCurrentDraft(e.target.value)
    }

    async function _createConversation() {
        if (!props.user || !appInitiated) {
            console.error('not logged in')
            return
        }

        const conversationId = await createConversation(
            // TODO remove this repetitiveness and simplify names
            {
                name: conversationFormState.newConversationName,
                peopleToAdd: conversationFormState.peopleForNewConversation,
            },
            props.user
        )
        if (conversationId) {
            dispatchWithConversationId({
                type: 'select_conversation',
                conversationId,
            })
        }
    }

    async function _createMessage(
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) {
        e.preventDefault()

        if (!props.user || !appInitiated) {
            console.error('not logged in')
            return
        } else if (!conversationId) {
            console.error('no conversation selected')
            return
        }

        try {
            await createMessage(props.user, currentDraft, conversationId)
            setCurrentDraft('')
        } catch (e) {
            alert(`something went wrong... ${e}`)
        }
    }

    async function _logOut() {
        try {
            await logOut()
        } catch (e) {
            console.error(`unable to log out: ${e}`)
        }
    }

    function openConversationForm(
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) {
        e.preventDefault()
        dispatchWithConversationId({ type: 'show_conversation_form' })
    }

    function openUserSettings(
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) {
        e.preventDefault()
        dispatchWithConversationId({ type: 'show_user_settings' })
    }

    function updateUserProfile(
        userInfo: Partial<Pick<firebase.UserInfo, 'displayName' | 'photoURL'>>
    ) {
        props.user?.updateProfile(userInfo).catch((error) => {
            alert(`user profile not updated with error ${error}`)
        })
    }

    function returnToMain() {
        dispatchWithConversationId({ type: 'return_to_main' })
    }

    const showInteractionLayout =
        windowSize !== 'xs' ||
        (windowSize === 'xs' &&
            (conversationId ||
                layoutState.showConversationForm ||
                layoutState.showUserSettings))
    const showHomeLayout =
        windowSize !== 'xs' ||
        (windowSize === 'xs' &&
            !conversationId &&
            !layoutState.showConversationForm &&
            !layoutState.showUserSettings)

    return (
        <div id="app-root">
            {showHomeLayout && (
                <HomeLayout>
                    <HomeToolbar
                        user={props.user}
                        userState={
                            props.user && userStatuses[props.user.uid]?.state
                        }
                    />
                    <div
                        onClick={openConversationForm}
                        className="hover"
                        style={{
                            margin: '16px 0',
                            padding: '8px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        New conversation
                        <div
                            style={{
                                display: 'flex',
                                height: '32px',
                                width: '32px',
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                borderRadius: '5px',
                                marginLeft: '8px',
                            }}
                        >
                            <FontAwesomeIcon icon={faPlusCircle} size={'sm'} />
                        </div>
                    </div>

                    <div
                        style={{
                            height: '100%',
                            padding: '0px 0px 16px',
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    overflow: 'auto',
                                }}
                            >
                                {conversations.map((convo) => (
                                    <ChatPreview
                                        key={convo.id}
                                        conversation={convo}
                                        onPreviewClick={handlePreviewSelect}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <BottomSettings
                        logOut={_logOut}
                        openUserSettings={openUserSettings}
                    />
                </HomeLayout>
            )}

            {showInteractionLayout && (
                <InteractionLayout>
                    {currentConversation && props.user ? (
                        <>
                            <InteractionBar
                                backIcon={windowSize === 'xs' ? '<' : 'X'}
                                back={returnToMain}
                                conversation={currentConversation}
                            />
                            <Interaction
                                userId={props.user.uid}
                                conversation={currentConversation}
                                messages={messages}
                                statuses={userStatuses}
                            />
                            <InteractionMessageEditor
                                // userId={props.user.uid}
                                currentDraft={currentDraft}
                                handleMessageChange={handleMessageChange}
                                handleSend={_createMessage}
                            />
                        </>
                    ) : layoutState.showConversationForm ? (
                        <>
                            <Header>
                                <div
                                    onClick={returnToMain}
                                    style={{
                                        display: 'flex',
                                        backgroundColor: 'black',
                                        color: 'white',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        padding: '8px 8px 8px 0',
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faArrowLeft}
                                        size={'lg'}
                                    />
                                </div>
                                <h3 style={{ marginLeft: '8px' }}>
                                    New conversation
                                </h3>
                                <div
                                    onClick={_createConversation}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '8px 0 8px 8px',
                                        marginLeft: 'auto',
                                    }}
                                >
                                    Create
                                </div>
                            </Header>
                            <InteractionCreator
                                userId={props.user?.uid}
                                users={users}
                                userStatuses={userStatuses}
                                formState={conversationFormState}
                                dispatchForm={dispatchConversationForm}
                            />
                        </>
                    ) : layoutState.showUserSettings ? (
                        <UserSettings
                            displayName={props.user?.displayName || ''}
                            updateProfile={updateUserProfile}
                        />
                    ) : null}
                </InteractionLayout>
            )}
        </div>
    )
}

export default withAuth(App)
