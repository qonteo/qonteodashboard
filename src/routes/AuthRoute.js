import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LoginScreen } from '../components/Auth/LoginScreen'
import { RegisterScreen } from '../components/Auth/RegisterScreen'
import { Navbar } from '../components/ui/Navbar'

export const AuthRouter = () => {
    return (
        <>
            <div>
            <Navbar />
                <Switch>
                    <Route exact path="/auth/login" component={LoginScreen} />
                    <Route exact path="/auth/registrarse" component={RegisterScreen} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </>
    )
}
