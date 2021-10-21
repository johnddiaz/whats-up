import { useState, useEffect } from 'react'

export type WindowSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// Initially based on https://usehooks.com/useWindowSize/
export function useWindowSize(): WindowSize | undefined {
    const [windowSize, setWindowSize] = useState<WindowSize | undefined>(() => {
        return calculateWindowSize(window.innerWidth)
    })

    function calculateWindowSize(windowWidth: number): WindowSize {
        if (windowWidth >= 1920) {
            return 'xl'
        } else if (windowWidth >= 1280) {
            return 'lg'
        } else if (windowWidth >= 960) {
            return 'md'
        } else if (windowWidth >= 700) {
            return 'sm'
        } else {
            return 'xs'
        }
    }

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth
            setWindowSize(calculateWindowSize(width))
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowSize
}
