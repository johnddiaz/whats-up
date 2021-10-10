import * as React from 'react'
import { ClientUserStatus } from '../../__shared__/types/userStatus'
import styles from './Avatar.module.scss'

interface Props {
    photoURL: string | null | undefined
    size?: 'sm' | 'lg'
    badgeState?: ClientUserStatus['state'] | null
    style?: React.CSSProperties
}

function Avatar(props: Props) {
    const avatarDimensions =
        props.size === 'sm'
            ? {
                  height: '28px',
                  width: '28px',
              }
            : {
                  height: '36px',
                  width: '36px',
              }
    const badgeDimensions =
        props.size === 'sm'
            ? {
                  height: '8px',
                  width: '8px',
                  marginTop: '-12px',
                  marginLeft: '21px',
              }
            : {
                  height: '11px',
                  width: '11px',
                  marginTop: '-14px',
                  marginLeft: '24px',
              }
    return (
        <div
            className={styles.root}
            style={{ ...avatarDimensions, ...props.style }}
        >
            <img
                src={props.photoURL as string}
                alt="profile pic"
                className={styles.img}
                style={avatarDimensions}
            />
            {props.badgeState && (
                <div
                    className={styles.badge}
                    style={{
                        backgroundColor:
                            props.badgeState === 'online'
                                ? '#57ba14'
                                : '#f9fff5',
                        ...badgeDimensions,
                    }}
                ></div>
            )}
        </div>
    )
}

export default Avatar
