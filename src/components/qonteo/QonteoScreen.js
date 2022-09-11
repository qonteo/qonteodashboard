import React from 'react'
import { QonteoDesktop } from '../desktop/QonteoDesktop'
import { QonteoMobile } from '../mobile/QonteoMobile'
import {isMobile,isBrowser,isSmartTV } from "react-device-detect"
export const QonteoScreen = () => {
    return (
        <>
            {isMobile && <QonteoMobile />}
            {(isBrowser || isSmartTV) && <QonteoDesktop />}
        </>
    )
}
