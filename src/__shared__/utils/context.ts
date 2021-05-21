import * as React from 'react'
import { Person } from '../api-responses/conversations'

export const LoggedInPersonContext = React.createContext<Person | undefined>(
    undefined
)
