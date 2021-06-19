import * as React from 'react'

import { Meta, Story } from '@storybook/react'

import Avatar from './index'
import { AvatarProps } from './Avatar'

export default {
    title: 'Components/Avatar',
    component: Avatar,
} as Meta

const Template: Story<AvatarProps> = (args) => <Avatar {...args} />

export const Small = Template.bind({})
Small.args = {
    size: 'sm',
}

export const Medium = Template.bind({})
Medium.args = {
    size: 'md',
}

export const Large = Template.bind({})
Large.args = {
    size: 'lg',
}
