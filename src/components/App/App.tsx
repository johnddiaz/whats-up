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

    async function createConversation() {
        if (!props.user) {
            console.error('not logged in')
            return
        } else if (
            conversationFormState.peopleForNewConversation.length === 0
        ) {
            console.error('no friends to add')
            return
        }

        try {
            const db = firebase.database()

            // Check if friendIds are valid
            const friendSnapshots = await Promise.all(
                conversationFormState.peopleForNewConversation.map(
                    (personId) => {
                        return db.ref(`users/${personId}`).once('value')
                    }
                )
            )

            for (let snapshot of friendSnapshots) {
                if (!snapshot.val()) {
                    alert(`Friend ID ${snapshot.key} does not exist.`)
                    return
                }
            }

            // Create new conversation
            const conversationRef = await db.ref(`conversations`).push()
            const conversationId = conversationRef.key

            await conversationRef.set({
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                creatorId: props.user.uid,
                name: conversationFormState.newConversationName,
            })

            const everythingElse: Record<string, any> = {}

            // For self
            everythingElse[
                `userConversations/${props.user.uid}/${conversationId}`
            ] = {
                invitedBy: props.user.uid,
            }
            everythingElse[
                `conversationUsers/${conversationId}/${props.user.uid}`
            ] = {
                invitedBy: props.user.uid,
                userName: props.user.displayName,
            }

            // For friends
            friendSnapshots.forEach((snapshot) => {
                everythingElse[
                    `userConversations/${snapshot.key}/${conversationId}`
                ] = {
                    invitedBy: props.user?.uid,
                }
                everythingElse[
                    `conversationUsers/${conversationId}/${snapshot.key}`
                ] = {
                    invitedBy: props.user?.uid,
                    userName: snapshot.child('userName').val() || '',
                }
            })

            await db.ref().update(everythingElse)

            if (conversationId) {
                dispatchWithConversationId({
                    type: 'select_conversation',
                    conversationId,
                })
            }
        } catch (outerError) {
            alert(`something went wrong: ${outerError}`)
        }
    }

    async function createMessage(
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) {
        e.preventDefault()

        if (!props.user || !appInitiated) {
            console.error('not logged in')
            return
        }

        const message = {
            sender: props.user.uid,
            senderName: props.user.displayName || '',
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            content: currentDraft,
            photoURL: props.user.photoURL,
        }

        const newMessageRef = await firebase
            .database()
            .ref(`messages/${conversationId}`)
            .push()
        newMessageRef.set(message, (error) => {
            if (error) {
                alert(`something went wrong... ${error}`)
            } else {
                setCurrentDraft('')
            }
        })
    }

    function logOut() {
        firebase
            .auth()
            .signOut()
            .catch((e) => {
                window.alert(`Unable to sign out with error ${e}`)
            })
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
                        logOut={logOut}
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
                                handleSend={createMessage}
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
                                    onClick={createConversation}
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
