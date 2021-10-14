import * as React from 'react'
import firebase from 'firebase'
import Avatar from '../Avatar'
import styles from './HomeHeader.module.scss'

interface Props {
    user: firebase.User | null
    userState: 'online' | 'offline' | null
}

export default function HomeHeader(props: Props) {
    return (
        <header className={styles.root}>
            {props.user?.photoURL && (
                <Avatar
                    photoURL={props.user.photoURL}
                    size={'sm'}
                    badgeState={props.userState}
                />
            )}

            <h3
                style={{
                    marginLeft: '16px',
                    fontSize: '1.3em',
                }}
            >
                Whats Up
            </h3>
        </header>
    )
}
