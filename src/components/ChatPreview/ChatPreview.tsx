import * as React from 'react'
import './ChatPreview.scss'
import '../../__shared__/styles.scss'
import Avatar from '../Avatar'
import { Conversation } from '../../__shared__/api-responses/conversations'
import { ClientConversation } from '../../__shared__/hooks/useConversation'

interface Props {
    conversation: ClientConversation
    onPreviewClick: (id: string) => void
}

function ChatPreview(props: Props) {
    function onPreviewClick() {
        props.onPreviewClick(props.conversation.id)
    }

    console.log(props.conversation)

    return (
        <div id="chatpreview-root" onClick={onPreviewClick}>
            <div id="chatpreview-text-root">
                <h4 style={{ margin: '0 0 8px' }}>
                    {props.conversation.name || props.conversation.id}
                </h4>
                <h5 style={{ margin: '0' }}>
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
                        : 'No other users here.'}
                </h5>
                <p style={{ margin: '0' }}>Last message would go here.</p>
            </div>
        </div>
    )
}

export default ChatPreview
