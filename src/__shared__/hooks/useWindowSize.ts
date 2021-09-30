import { useState, useEffect } from 'react'

export type WindowSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Initially based on https://usehooks.com/useWindowSize/
export function useWindowSize(): WindowSize | undefined {
    const [windowSize, setWindowSize] = useState<WindowSize | undefined>()

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth
            if (width >= 1920) {
                setWindowSize('xl')
            } else if (width >= 1280) {
                setWindowSize('lg')
            } else if (width >= 960) {
                setWindowSize('md')
            } else if (width >= 600) {
                setWindowSize('sm')
            } else {
                setWindowSize('xs')
            }
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}
