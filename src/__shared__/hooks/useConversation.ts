import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

export interface ServerMessage {
    content: string;
    sender?: string;
    createdAt?: string;
}

export interface ClientMessage extends ServerMessage {
    id: string;
}

interface ClientUser {
    id: string;
    name?: string;
}

export interface ClientConversation {
    id: string;
    otherUsers: ClientUser[]
}

export function useConversation(
    initialized: boolean,
    userId?: string
): {
    messages: ClientMessage[],
    setMessages: React.Dispatch<React.SetStateAction<ClientMessage[]>>,
    conversations: ClientConversation[],
    conversationId: string | null,
    setConversationId: React.Dispatch<React.SetStateAction<string | null>>,
} {
    const [conversations, setConversations] = useState<ClientConversation[]>([])
    const [conversationId, setConversationId] = useState<string | null>(
        // null
        '-Mhq8wgUkPd0Qs0_cCqV'
    )
    const [messages, setMessages] = useState<ClientMessage[]>(
        []
    )

    useEffect(() => {
        try {
            if (!initialized || !userId) {
                return
            }

            const db = firebase.database()
            
            const userConversationsRefString = `userConversations/${userId}`
            const userConversationsRef = db.ref(userConversationsRefString)

            const conversationsRefString = 'conversations'
            const conversationsRef = db.ref(conversationsRefString)

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
                if (!userConversationsOnce.exists()) {
                    console.log(`${userConversationsRefString} userConversation ref does not exist.`)
                    return
                }

                const cuPromises: Promise<firebase.database.DataSnapshot>[] = []
                userConversationsOnce.forEach((uc) => {
                    cuPromises.push(db.ref(`conversationUsers/${uc.key}`).orderByKey().once('value'))
                })
                const cuResolved = await Promise.all(cuPromises)

                // Loop through each conversation the logged in user is a part of
                // to create a ClientConversation for each conversation.
                userConversationsOnce.forEach((uc) => {
                    if (!uc.key) {
                        return
                    }
                    const convo: ClientConversation = {
                        id: uc.key,
                        otherUsers: []
                    }
                    // Check if conversation keys match 
                    const matchedConversationUsers = cuResolved.find(cur => cur.ref.key === uc.key)
                    // Add other users to the ClientConversation.
                    if (matchedConversationUsers) {
                        matchedConversationUsers.forEach(conversationUser => {
                            if (conversationUser.key && conversationUser.key !== userId) {
                                convo.otherUsers.push({
                                    id: conversationUser.key
                                })
                            }
                        })
                    }

                    initialConversations.push(convo)
                })

                setConversations((prev) => initialConversations)

                const lastInitialUserConversationId =
                    initialConversations.length > 0
                        ? initialConversations[initialConversations.length - 1].id
                        : null
                userConversationsRef
                    .orderByKey()
                    .startAfter(lastInitialUserConversationId)
                    .on('child_added', (userConversationSnapshot, previousChildKey) => {
                        // userConversationSnapshot.key is a new conversation key
                        const ucKey = userConversationSnapshot.key
                        if (ucKey) {
                            db.ref(`conversationUsers/${ucKey}`).orderByKey().once('value').then(newConversationUsers => {
                                const convo: ClientConversation = {
                                    id: ucKey,
                                    otherUsers: []
                                }
                                newConversationUsers.forEach(ncu => {
                                    if (ncu.key) {
                                        convo.otherUsers.push({
                                            id: ncu.key
                                        })
                                    }
                                })
                                setConversations((prev) => [...prev, convo])
                                console.log(
                                    `New conversation: ${JSON.stringify(convo)}`
                                )
                            })
                        }
                    })
            })()

            return () => {
                console.log('cleanup called userConversations')
                userConversationsRef.off('child_added')
            }
        } catch(e) {
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
                                id: m.key
                            })
                        }
                    })
                    setMessages(initialMessages)
                    console.log(
                        `${messagesRefString} ref found! Initial messages set.`
                    )
                } else {
                    console.log(`${messagesRefString} message ref does not exist.`)
                    return
                }
                const lastInitialMessageId =
                    initialMessages.length > 0
                        ? initialMessages[initialMessages.length - 1].id
                        : null
                messagesRef
                    .orderByKey()
                    .startAfter(lastInitialMessageId)
                    .on('child_added', (messageSnapshot, previousChildKey) => {
                        if (messageSnapshot.key) {
                            const serverMessage = messageSnapshot.toJSON() as ServerMessage
                            const clientMessage: ClientMessage = {
                                ...serverMessage,
                                id: messageSnapshot.key
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

    return {messages, setMessages, conversations, conversationId, setConversationId}
}