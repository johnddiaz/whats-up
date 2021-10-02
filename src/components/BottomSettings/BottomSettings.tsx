import React from 'react'
import styles from './BottomSettings.module.scss'

interface Props {
    logOut: () => void
    openUserSettings: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void
}

function BottomSettings(props: Props) {
    return (
        <div className={styles.root}>
            <button
                onClick={props.openUserSettings}
                style={{ marginBottom: '8px' }}
            >
                Edit User Settings
            </button>
            <button onClick={props.logOut}>Log Out</button>
        </div>
    )
}

export default BottomSettings
