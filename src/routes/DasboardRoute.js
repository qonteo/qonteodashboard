import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { QonteoScreen } from '../components/qonteo/QonteoScreen'
import {  SearchScreen } from '../components/desktop/SearchScreen'
import { PersonDesktop } from '../components/desktop/PersonDesktop'
import { NavbarDesktop } from '../components/ui/NavbarDesktop'
import { isMobile,isBrowser,isSmartTV } from 'react-device-detect'
import { Navbar } from '../components/ui/Navbar'
import { DestacadosScreen } from '../components/desktop/DestacadosScreen'

export const DashboardRouter = () => {
    
    return (
        <>

            <div>

            {(isBrowser || isSmartTV)  && <NavbarDesktop  />}
            
            {isMobile && <Navbar />}
        
                

            <Switch>
                <Route exact path="/" component={QonteoScreen} />
                <Route exact path="/vehiculos" component={QonteoScreen} />
                <Route exact path="/personas" component={PersonDesktop} />
                <Route exact path="/buscador" component={SearchScreen} />

                <Redirect  to="/" />
            </Switch>
            </div>
        </>
    )
}
