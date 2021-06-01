import * as React from 'react'

import { Story, Meta } from '@storybook/react'

import { InteractionMessage, InteractionMessageProps } from './index'
import { john } from '../__shared__/api-responses/conversations'

export default {
    title: 'Components/InteractionMessage',
    component: InteractionMessage,
} as Meta

const Template: Story<InteractionMessageProps> = (args) => (
    <InteractionMessage {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
    loggedInPerson: john,
    message: {
        id: john.id,
        senderId: john.id,
        senderName: john.name,
        text: 'This is a test message!',
    },
}
