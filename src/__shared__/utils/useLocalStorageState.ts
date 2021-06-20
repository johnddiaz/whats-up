import { SetStateAction } from "react";
import { Dispatch, useEffect, useState } from "react";

function useLocalStorageState<T = null>(key: string): [T | null, Dispatch<SetStateAction<T | null>>] {
    const [value, setValue] = useState<T | null>(() => {
        const storedValue = localStorage.getItem(key)
        const parsed = !!storedValue && JSON.parse(storedValue)
        if (!parsed) {
            return null;
        } else {
            return parsed
        }
    })
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useLocalStorageState