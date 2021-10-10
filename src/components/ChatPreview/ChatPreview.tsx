import * as React from 'react'
import styles from './ChatPreview.module.scss'
import '../../__shared__/styles.scss'
import { ClientConversation } from '../../__shared__/models'

interface Props {
    conversation: ClientConversation
    onPreviewClick: (id: string) => void
}

export default function ChatPreview(props: Props) {
    function onPreviewClick() {
        props.onPreviewClick(props.conversation.id)
    }

    return (
        <div className={styles.root} onClick={onPreviewClick}>
            <div className={styles.textRoot}>
                <h4 style={{ margin: '0 0 8px' }}>
                    {props.conversation.name || props.conversation.id}
                </h4>
                <p style={{ margin: '0' }}>
                    {props.conversation.otherUsers.length > 0
                        ? props.conversation.otherUsers.map(
                              (user, index, original) => {
                                  if (
                                      original.length === 1 ||
                                      index === original.length - 1
                                  ) {
                                      return user.userName || user.id
                                  } else {
                                      return `${user.userName || user.id}, `
                                  }
                              }
                          )
                        : 'No users here.'}
                </p>
            </div>
        </div>
    )
}
