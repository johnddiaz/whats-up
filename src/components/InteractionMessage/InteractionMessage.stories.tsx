import * as React from 'react'

import { Story, Meta } from '@storybook/react'

import InteractionMessage, {
    InteractionMessageProps,
} from './InteractionMessage'

export default {
    title: 'Components/InteractionMessage',
    component: InteractionMessage,
} as Meta

const Template: Story<InteractionMessageProps> = (args) => (
    <InteractionMessage {...args} />
)

export const SentMessage = Template.bind({})
SentMessage.args = {
    isSender: true,
    userStatus: undefined,
    message: {
        content: 'Hey there!',
        createdAt: 1633241030046,
        id: 'g82s8f',
        sender: '8bja2k',
        senderName: 'John Johnson',
    },
}

export const ReceivedMessage = Template.bind({})
ReceivedMessage.args = {
    isSender: false,
    userStatus: {
        lastChanged: 1633241030047,
        state: 'online',
    },
    message: {
        content: 'Long time no see.',
        createdAt: 1633241030047,
        id: 'b8ajws',
        sender: 'q82mzan',
        senderName: 'Billy Bilson',
    },
    showName: true,
    avatarProps: {
        photoURL:
            'https://lh3.googleusercontent.com/a/AATXAJwusNLTwGYIC4ZWHziVqfYtv4ZznSOpEUL3XtX8=s96-c',
        badgeState: 'online',
    },
}
