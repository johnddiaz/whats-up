import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import { ClientConversation, ClientMessage, ServerMessage } from '../models'

export function useConversation(
    initialized: boolean,
    userId?: string
): {
    messages: ClientMessage[]
    conversations: ClientConversation[]
    conversationId: string | null
    setConversationId: React.Dispatch<React.SetStateAction<string | null>>
} {
    const [conversations, setConversations] = useState<ClientConversation[]>([])
    const [conversationId, setConversationId] = useState<string | null>(
        null
        // '-Mhq8wgUkPd0Qs0_cCqV'
    )
    const [messages, setMessages] = useState<ClientMessage[]>([])

    useEffect(() => {
        try {
            if (!initialized || !userId) {
                return
            }

            const db = firebase.database()

            const userConversationsRefString = `userConversations/${userId}`
            const userConversationsRef = db.ref(userConversationsRefString)

            // What I need to do next is display a list of conversations in the UI that the user has access to.
            // I need to use a combination of userConversations and conversations.
            // userConversations for knowing which user has access to what conversation,
            // and conversations for getting the metadata of conversations,
            // then conversationUsers to know who is in the conversation.

            ;(async () => {
                const userConversationsOnce = await userConversationsRef
                    .orderByKey()
                    .once('value')
                const initialConversations: ClientConversation[] = []
                let lastInitialUserConversationId = ''
                if (userConversationsOnce.exists()) {
                    const convoPromises: Promise<firebase.database.DataSnapshot>[] = []
                    const cuPromises: Promise<firebase.database.DataSnapshot>[] = []

                    userConversationsOnce.forEach((uc) => {
                        convoPromises.push(
                            db
                                .ref(`conversations/${uc.key}`)
                                .orderByKey()
                                .once('value')
                        )
                        cuPromises.push(
                            db
                                .ref(`conversationUsers/${uc.key}`)
                                .orderByKey()
                                .once('value')
                        )
                    })

                    const convoResolved = await Promise.all(convoPromises)
                    const cuResolved = await Promise.all(cuPromises)

                    // Loop through each conversation the logged in user is a part of
                    // to create a ClientConversation for each conversation.
                    userConversationsOnce.forEach((uc) => {
                        if (!uc.key) {
                            return
                        }
                        const convo: ClientConversation = {
                            id: uc.key,
                            otherUsers: [],
                            name: '',
                        }
                        // Check if conversation keys match
                        const matchedConversation = convoResolved.find(
                            (cor) => cor.ref.key === uc.key
                        )
                        const matchedConversationUsers = cuResolved.find(
                            (cur) => cur.ref.key === uc.key
                        )

                        // Add name to convo
                        if (matchedConversation) {
                            console.log(
                                'matchedConvo',
                                matchedConversation,
                                matchedConversation.val()
                            )
                            convo.name = matchedConversation.val().name
                        }

                        // Add other users to the ClientConversation.
                        if (matchedConversationUsers) {
                            matchedConversationUsers.forEach(
                                (conversationUser) => {
                                    if (
                                        conversationUser.key &&
                                        conversationUser.key !== userId
                                    ) {
                                        convo.otherUsers.push({
                                            id: conversationUser.key,
                                            userName: conversationUser
                                                .child('userName')
                                                .val(),
                                        })
                                    }
                                }
                            )
                        }

                        initialConversations.push(convo)
                    })

                    setConversations((prev) => initialConversations)

                    lastInitialUserConversationId =
                        initialConversations.length > 0
                            ? initialConversations[
                                  initialConversations.length - 1
                              ].id
                            : ''
                } else {
                    setConversations([])
                    setConversationId(null)
                    console.log(
                        `${userConversationsRefString} userConversation ref does not exist.`
                    )
                }

                userConversationsRef
                    .orderByKey()
                    .startAfter(lastInitialUserConversationId)
                    .on(
                        'child_added',
                        (userConversationSnapshot, previousChildKey) => {
                            // userConversationSnapshot.key is a new conversation key
                            const ucKey = userConversationSnapshot.key
                            if (ucKey) {
                                const convo: ClientConversation = {
                                    id: ucKey,
                                    otherUsers: [],
                                    name: '',
                                }
                                db.ref(`conversations/${ucKey}`)
                                    .orderByKey()
                                    .once('value')
                                    .then((conversation) => {
                                        convo.name = conversation.val().name
                                        db.ref(`conversationUsers/${ucKey}`)
                                            .orderByKey()
                                            .once('value')
                                            .then((newConversationUsers) => {
                                                newConversationUsers.forEach(
                                                    (ncu) => {
                                                        if (
                                                            ncu.key &&
                                                            ncu.key !== userId
                                                        ) {
                                                            convo.otherUsers.push(
                                                                {
                                                                    id: ncu.key,
                                                                    userName: ncu
                                                                        .child(
                                                                            'userName'
                                                                        )
                                                                        .val(),
                                                                }
                                                            )
                                                        }
                                                    }
                                                )
                                                setConversations((prev) => [
                                                    ...prev,
                                                    convo,
                                                ])
                                                console.log(
                                                    `New conversation: ${JSON.stringify(
                                                        convo
                                                    )}`
                                                )
                                            })
                                    })
                            }
                        }
                    )
            })()

            return () => {
                console.log('cleanup called userConversations')
                userConversationsRef.off('child_added')
            }
        } catch (e) {
            return
        }
    }, [initialized, userId])

    useEffect(() => {
        try {
            if (!initialized || !userId || !conversationId) {
                return
            }
            const db = firebase.database()
            const messagesRefString = `messages/${conversationId}`
            const messagesRef = db.ref(messagesRefString)

            ;(async () => {
                const messagesOnce = await messagesRef
                    .orderByKey()
                    .once('value')
                const initialMessages: ClientMessage[] = []
                // This if else may not really be necessary.
                if (messagesOnce.exists()) {
                    messagesOnce.forEach((m) => {
                        if (m.key) {
                            const serverMessage = m.toJSON() as ServerMessage
                            initialMessages.push({
                                ...serverMessage,
                                id: m.key,
                            })
                        }
                    })
                    setMessages(initialMessages)
                    console.log(
                        `${messagesRefString} ref found! Initial messages set.`
                    )
                } else {
                    console.log(
                        `${messagesRefString} message ref does not exist.`
                    )
                    setMessages([])
                }
                const lastInitialMessageId: string =
                    initialMessages.length > 0
                        ? initialMessages[initialMessages.length - 1].id
                        : ''
                messagesRef
                    .orderByKey()
                    .startAfter(lastInitialMessageId)
                    .on('child_added', (messageSnapshot, previousChildKey) => {
                        if (messageSnapshot.key) {
                            const serverMessage = messageSnapshot.toJSON() as ServerMessage
                            const clientMessage: ClientMessage = {
                                ...serverMessage,
                                id: messageSnapshot.key,
                            }
                            setMessages((prev) => [...prev, clientMessage])
                            console.log(
                                `New message ${messageSnapshot.key}: ${clientMessage}`
                            )
                        }
                    })
            })()

            return () => {
                console.log('cleanup called messages')
                messagesRef.off('child_added')
            }
        } catch (e) {
            console.log('whoops', e)
        }
    }, [initialized, userId, conversationId])

    return {
        messages,
        conversations,
        conversationId,
        setConversationId,
    }
}
