import React from 'react'
import { PersonDesktop } from '../desktop/Persons'
import { QonteoMobile } from '../mobile/QonteoMobile'
import {isMobile,isBrowser,isSmartTV } from "react-device-detect"
export const QonteoScreen = () => {
    return (
        <>
            {isMobile && <QonteoMobile />}
            {(isBrowser || isSmartTV) && <PersonDesktop />}
        </>
    )
}
