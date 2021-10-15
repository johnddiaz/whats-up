import * as React from 'react'
import styles from './Header.module.scss'

interface Props {
    children?: React.ReactNode
}

export default function Header(props: Props) {
    return <header className={styles.root}>{props.children}</header>
}
