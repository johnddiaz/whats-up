import * as React from 'react'
import './Avatar.scss'

type AvatarProps = {
    size: 'sm' | 'md' | 'lg'
}

function Avatar(props: AvatarProps) {
    const dimensions =
        props.size === 'sm'
            ? { height: '32px', width: '32px' }
            : props.size === 'md'
            ? { height: '44px', width: '44px' }
            : { height: '56px', width: '56px' }

    return (
        <div style={dimensions} id="avatar-root">
            ?
        </div>
    )
}

export type { AvatarProps }
export default Avatar
