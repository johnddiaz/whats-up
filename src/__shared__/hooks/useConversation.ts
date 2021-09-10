import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

export function useConversation(
    initialized: boolean,
    userId?: string
): [
    firebase.database.DataSnapshot[],
    React.Dispatch<React.SetStateAction<firebase.database.DataSnapshot[]>>,
    React.Dispatch<React.SetStateAction<string | null>>
] {
    const [conversationId, setConversationId] = useState<string | null>(
        null
    )
    const [messages, setMessages] = useState<firebase.database.DataSnapshot[]>(
        []
    )

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
                const initialMessages: firebase.database.DataSnapshot[] = []
                // This if else may not really be necessary.
                if (messagesOnce.exists()) {
                    messagesOnce.forEach((m) => {
                        initialMessages.push(m)
                    })
                    setMessages(initialMessages)
                    console.log(
                        `${messagesRefString} ref found! Initial messages set.`
                    )
                } else {
                    console.log(`${messagesRefString} ref does not exist.`)
                    return
                }
                const lastInitialMessageId =
                    initialMessages.length > 0
                        ? initialMessages[initialMessages.length - 1].key
                        : null
                messagesRef
                    .orderByKey()
                    .startAfter(lastInitialMessageId)
                    .on('child_added', (messageSnapshot, previousChildKey) => {
                        const messageValue = messageSnapshot.val()
                        setMessages((prev) => [...prev, messageValue])
                        console.log(
                            `New message: ${JSON.stringify(messageValue)}`
                        )
                    })
            })()

            return () => {
                console.log('cleanup called')
                messagesRef.off('child_added')
            }
        } catch (e) {
            console.log('whoops', e)
        }
    }, [initialized, userId, conversationId])

    console.log('rendered useConversation', messages)

    return [messages, setMessages, setConversationId]
}