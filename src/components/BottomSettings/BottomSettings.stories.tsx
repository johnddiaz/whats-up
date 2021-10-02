import * as React from 'react'
import BottomSettings from './BottomSettings'

export default {
    title: 'BottomSettings',
}

export const Default = () => (
    <BottomSettings
        logOut={() => undefined}
        openUserSettings={(
            e: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => undefined}
    />
)

Default.story = {
    name: 'default',
}
