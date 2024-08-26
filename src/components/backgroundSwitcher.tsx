import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MobileBackground from './mobileBackground'
import StarsBackground from './dots'

const BackgroundSwitcher: React.FC = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

    return <>{isMobile ? <MobileBackground /> : <StarsBackground />}</>
}

export default BackgroundSwitcher
