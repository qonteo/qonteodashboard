import React from 'react'
import { IconsAuth } from './IconsAuth'
import { NavLink } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch } from 'react-redux'
import { startRegister } from '../../actions/auth'


export const RegisterScreen = ({history}) => {
    const dispatch = useDispatch()
    const [inputValue,inputChange]=useForm({
        rFirstname:'',
        rLastname:'',
        rEmail:'',
        rPassword:''
    })
    const {rFirstname,rLastname,rEmail,rPassword}=inputValue

    const handletRegister=(e)=>{
        e.preventDefault();
        dispatch(startRegister(rFirstname,rLastname,rEmail,rPassword))
        history.replace('/auth/login')
    }

    return (
        <div className="front_formulario contenedor">
            <IconsAuth />

        <form id="register_form" onSubmit={handletRegister}>
            <input type="text" onChange={inputChange} value={rFirstname} name="rFirstname" id="firstname" autoComplete="off" placeholder="Nombre" />
            <input type="text" onChange={inputChange} value={rLastname} name="rLastname" id="lastname" autoComplete="off" placeholder="Apellidos" />
            <input type="email" onChange={inputChange} value={rEmail} name="rEmail" id="correoregister" autoComplete="off" placeholder="Correo electrónico" />
            <input type="password" onChange={inputChange} value={rPassword} name="rPassword" id="contraregister" autoComplete="off" placeholder="Contraseña" />
            <div className="olvidaste_pass">

            </div>
            <input type="submit" value="Registrarse" className="btn btn-login" />
        </form>
        <NavLink className="enlace_registro" to="/auth/login">Ingresar</NavLink>
    </div>
    )
}
