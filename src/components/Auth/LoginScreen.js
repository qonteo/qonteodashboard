import React from 'react'
import { NavLink } from 'react-router-dom'
import { IconsAuth } from './IconsAuth'
import { useForm } from '../../hooks/useForm'
import { startLogin } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { fetchSinToken } from '../../helpers/fetch'

import Swal from 'sweetalert2'
import { ChooseGroup } from './ChooseGroup'

export const LoginScreen = ({ history }) => {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSelect, setIsSelect] = React.useState(false);
    const [countGroup, setcountGroup] = React.useState([])

    const dispatch = useDispatch();

    const [fields, inputChange] = useForm({
        email: '',
        password: ''
    })
    const { email, password } = fields;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (email !== '' && password !== '') {
                setIsLoading(true);
                const resp = await (await fetchSinToken('login', fields, 'POST')).json();
                if (!!resp.errors) {
                    setIsLoading(false);
                    return Swal.fire('Error', 'Las credenciales son invalidas', 'error');
                };

                const { user: { groups } } = resp
                setIsLoading(false);
                if (groups.length === 0 || !groups) return setError('No tiene acceso a este sitio')
                if (groups.length === 1 && groups[0].name !== 'CO.PMXCO.BOG.A01') return setError('No pertenece a este grupo')
                if (groups.length === 1 && groups[0].name === 'CO.PMXCO.BOG.A01') return dispatch(startLogin(resp));

                setIsSelect(true);
                setcountGroup(groups);
                return;
            }
            Swal.fire('Error', 'Los campos no pueden estar vacios', 'error')

        } catch (error) {
            throw new Error('ocurrio un error al realizar la peticion')
        }


    }

    return (
        <div className="front_formulario contenedor">
            <IconsAuth />

            <div className="contenedor">
                {!isSelect
                    ? (
                        <>
                            <span className="error spaceTopSmall d-block text-center">{error && error}</span>
                            <form onSubmit={handleLogin} className="formLogin spaceBottomSmall" >
                                <input type="text" name="email"
                                    onChange={inputChange}
                                    placeholder="Correo electrónico"
                                    value={email}
                                />
                                <input type="password"
                                    name="password"
                                    onChange={inputChange}
                                    placeholder="Contraseña"
                                    value={password}
                                />
                                <div className="olvidaste_pass">
                                    <span>¿Olvidaste tu contraseña?</span>
                                </div>

                                <input type="submit" value={isLoading ? 'Cargando...' : 'Iniciar Sesíon'} className="btn btn-login" />
                                <NavLink className="enlace_registro" to="/auth/registrarse">Registrarse</NavLink>
                            </form>
                        </>
                    )
                    :
                    (
                        <ChooseGroup groups={countGroup} data={fields} />
                    )
                }
            </div>
        </div>
    )
}
