import React, { useState } from 'react'
import './styles.scss'
import '../../__shared__/styles.scss'
import ChatPreview from '../ChatPreview'
import HomeToolbar from '../ChatsToolbar'
import {
    Conversation,
    // conversations,
    john,
    Message,
} from '../../__shared__/api-responses/conversations'
import Interaction from '../Interaction'
import InteractionMessageEditor from '../InteractionMessageEditor'
import { ChatsLayout as HomeLayout, InteractionLayout } from './layouts'
import withAuth from '../../__shared__/auth/withAuth'
import firebase from 'firebase'
import InteractionCreator from '../InteractionCreator'
import { useEffect } from 'react'
import {
    ClientConversation,
    ClientMessage,
    useConversation,
} from '../../__shared__/hooks/useConversation'
import { useWindowSize } from '../../__shared__/hooks/useWindowSize'
import InteractionBar from '../InteractionBar'

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

    const [currentDraft, setCurrentDraft] = React.useState('')
    const [searchValue, setSearchValue] = React.useState('')
    const windowSize = useWindowSize()
    const [showConversationForm, setShowConversationForm] = React.useState(
        false
    )

    function handlePreviewSelect(id: string) {
        setConversationId(id)
        console.log('conversation id changed to ', id)
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
            const snapshot = await db.ref(`users/${friendId}`).once('value')
            if (!snapshot.val()) {
                alert(`Friend ID ${friendId} does not exist.`)
                return
            }

            // Create new conversation
            const conversationRef = await db.ref(`conversations`).push()
            const conversationId = conversationRef.key
            console.log(`Created conversation ${conversationId}`)
            await conversationRef.set({
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                creatorId: props.user.uid,
                name: name,
            })
            console.log('Set successful')

            const everythingElse: Record<string, any> = {}

            // For self
            everythingElse[
                `userConversations/${props.user.uid}/${conversationId}`
            ] = true
            everythingElse[
                `conversationUsers/${conversationId}/${props.user.uid}`
            ] = true

            // For friend
            everythingElse[`userInvitations/${conversationId}/${friendId}`] = {
                invitedBy: props.user.uid,
            }

            await db.ref().update(everythingElse)

            setConversationId(conversationId)
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
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            content: currentDraft,
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
        setConversationId(null)
        setShowConversationForm(true)
    }

    console.log(windowSize)

    const showInteractionLayout =
        windowSize !== 'xs' ||
        (windowSize === 'xs' && (conversationId || showConversationForm))
    const showHomeLayout =
        windowSize !== 'xs' ||
        (windowSize === 'xs' && !conversationId && !showConversationForm)
    const currentConversation =
        conversationId &&
        (conversations.find(
            (c) => c.id === conversationId
        ) as ClientConversation)
    const back = () => {
        setConversationId(null)
        setShowConversationForm(false)
    }

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
                            overflow: 'scroll',
                            borderBottom: '1px solid black',
                            padding: '0px 4px 16px',
                            height: '100%',
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
                    <button onClick={logOut}>Log Out</button>
                </HomeLayout>
            )}

            {showInteractionLayout && (
                <InteractionLayout>
                    {currentConversation && props.user ? (
                        <>
                            <InteractionBar
                                backIcon={windowSize === 'xs' ? '<' : 'X'}
                                back={back}
                                conversation={currentConversation}
                            />
                            <div style={{ height: '16px' }}></div>
                            <Interaction
                                userId={props.user.uid}
                                conversation={currentConversation}
                                messages={messages}
                            />
                            <InteractionMessageEditor
                                // userId={props.user.uid}
                                currentDraft={currentDraft}
                                handleMessageChange={handleMessageChange}
                                handleSend={createMessage}
                            />
                        </>
                    ) : (
                        <InteractionCreator
                            createConversation={createConversation}
                            back={windowSize === 'xs' ? back : undefined}
                        />
                    )}
                </InteractionLayout>
            )}
        </div>
    )
}

export default withAuth(App)
