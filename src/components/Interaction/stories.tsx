import * as React from 'react'

import { Meta, Story } from '@storybook/react'

import Interaction from './index'
import { InteractionProps } from './Interaction'
import { john, squishy } from '../../__shared__/api-responses/conversations'

export default {
    title: 'Components/Interaction',
    component: Interaction,
} as Meta

const Template: Story<InteractionProps> = (args) => <Interaction {...args} />

export const Default = Template.bind({})
Default.args = {
    conversation: {
        id: 1,
        participants: [squishy],
        messages: [
            {
                id: 1,
                senderId: john.id,
                senderName: john.name,
                text: `Hey, howsitgoin? I'm bored.`,
            },
            {
                id: 2,
                senderId: squishy.id,
                senderName: squishy.name,
                text: 'Good, howaboutchu?',
            },
            {
                id: 3,
                senderId: john.id,
                senderName: john.name,
                text: 'Eggcelent.',
            },
            {
                id: 4,
                senderId: squishy.id,
                senderName: squishy.name,
                text: `Cool beans, good sir. Well, take care, don't talk to strangers, and stay safe!`,
            },
        ],
    },
    newMessages: [],
}
