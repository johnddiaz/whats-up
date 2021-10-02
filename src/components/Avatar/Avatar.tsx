import * as React from 'react'
import { ClientUser } from '../../__shared__/types/user'
import { ClientUserStatus } from '../../__shared__/types/userStatus'
import styles from './Avatar.module.scss'

interface Props {
    photoURL: Required<ClientUser['photoURL']>
    badgeState?: ClientUserStatus['state']
}

function Avatar(props: Props) {
    return (
        <div className={styles.root}>
            <img
                src={props.photoURL}
                alt="profile pic"
                className={styles.img}
            />
            {props.badgeState && (
                <div
                    className={styles.badge}
                    style={{
                        backgroundColor:
                            props.badgeState === 'online'
                                ? '#57ba14'
                                : '#f9fff5',
                    }}
                ></div>
            )}
        </div>
    )
}

export default Avatar
