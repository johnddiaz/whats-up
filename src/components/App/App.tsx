import React from 'react'
import './styles.scss'
import '../../__shared__/styles.scss'
import ChatPreview from '../ChatPreview'
import HomeToolbar from '../ChatsToolbar'
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
import Avatar from '../Avatar'

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
    const [searchValue, setSearchValue] = React.useState('')
    const [layoutState, layoutStateDispatch] = useLayoutStateReducer()

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

    function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setSearchValue(e.target.value)
    }

    async function createConversation(friendId: string, name: string) {
        if (!props.user) {
            console.error('not logged in')
            return
        }

        try {
            const db = firebase.database()

            // Check if friendId is valid
            const friendSnapshot = await db
                .ref(`users/${friendId}`)
                .once('value')
            if (!friendSnapshot.val()) {
                alert(`Friend ID ${friendId} does not exist.`)
                return
            }

            // Create new conversation
            const conversationRef = await db.ref(`conversations`).push()
            const conversationId = conversationRef.key

            await conversationRef.set({
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                creatorId: props.user.uid,
                name: name,
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

            // For friend
            everythingElse[
                `userConversations/${friendId}/${conversationId}`
            ] = {
                invitedBy: props.user.uid,
            }
            everythingElse[
                `conversationUsers/${conversationId}/${friendId}`
            ] = {
                invitedBy: props.user.uid,
                userName: friendSnapshot.child('userName').val() || '',
            }

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
                        searchValue={searchValue}
                        handleSearchChange={handleSearchValueChange}
                        openConversationForm={openConversationForm}
                    />
                    <div
                        style={{
                            height: '100%',
                            padding: '0px 4px 16px',
                            marginLeft: '16px',
                            marginRight: '16px',
                        }}
                    >
                        <div>
                            <h3>Conversations</h3>
                            <div
                                style={{
                                    overflow: 'scroll',
                                }}
                            >
                                {conversations
                                    .filter((convo) => {
                                        return (
                                            !searchValue ||
                                            convo.name.includes(searchValue)
                                        )
                                    })
                                    .map((convo) => (
                                        <ChatPreview
                                            key={convo.id}
                                            conversation={convo}
                                            onPreviewClick={handlePreviewSelect}
                                        />
                                    ))}
                            </div>
                        </div>
                        <div>
                            <h3>People</h3>
                            <div style={{ overflow: 'scroll' }}>
                                {users
                                    .filter(
                                        (user) => user.id !== props.user?.uid
                                    )
                                    .map((user) => (
                                        <div
                                            key={user.id}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                border: '1px solid black',
                                                borderRadius: '12px',
                                                padding: '16px',
                                                marginBottom: '8px',
                                            }}
                                        >
                                            {user.photoURL && (
                                                <Avatar
                                                    photoURL={user.photoURL}
                                                    badgeState={
                                                        userStatuses[user.id]
                                                            .state
                                                    }
                                                />
                                            )}

                                            <h5
                                                style={{
                                                    margin: '0',
                                                }}
                                            >
                                                {user.userName}
                                            </h5>
                                        </div>
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
                            <div style={{ height: '16px' }}></div>
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
                        <InteractionCreator
                            createConversation={createConversation}
                            back={
                                windowSize === 'xs' ? returnToMain : undefined
                            }
                        />
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
