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

interface AppProps {
    user: firebase.User | null
}

function App(props: AppProps) {
    const appInitiated = firebase.apps.length > 0
    const {
        messages,
        setMessages,
        conversations,
        conversationId,
        setConversationId,
    } = useConversation(appInitiated, props.user?.uid)

    const [currentDraft, setCurrentDraft] = React.useState('')

    function handlePreviewSelect(id: string) {
        setConversationId(id)
        console.log('conversation id changed to ', id)
    }

    function handleMessageChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setCurrentDraft(e.target.value)
    }

    function makeNewMessageId(): number {
        // let lastId: number

        // if (newMessages.length === 0) {
        //     const messages = currentConversation?.messages
        //     lastId = messages ? messages[messages.length - 1].id : 0
        // } else {
        //     lastId = newMessages[newMessages.length - 1].id
        // }

        // return lastId + 1
        return 0
    }

    async function createConversation(friendId: string) {
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

    async function handleSend(
        e: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) {
        e.preventDefault()

        alert('handleSend not working yet')

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
            .ref(`users/${props.user.uid}/messages`)
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

    return (
        <div id="app-root">
            <button onClick={logOut}>Log Out</button>
            <HomeLayout>
                <HomeToolbar />
                {conversations.map((convo) => (
                    <ChatPreview
                        key={convo.id}
                        conversation={convo}
                        onPreviewClick={handlePreviewSelect}
                    />
                ))}
            </HomeLayout>
            <InteractionLayout>
                {/* Header */}
                {/* {conversationId ? (
                    <>
                        <Interaction
                            conversation={conversations.find(c => c.id === conversationId) as ClientConversation}
                            newMessages={messages}
                        />
                        <InteractionMessageEditor
                            currentDraft={currentDraft}
                            handleMessageChange={handleMessageChange}
                            handleSend={handleSend}
                        />
                    </>
                ) : ( */}
                <InteractionCreator createConversation={createConversation} />
                {/* )} */}
            </InteractionLayout>
        </div>
    )
}

export default withAuth(App)
