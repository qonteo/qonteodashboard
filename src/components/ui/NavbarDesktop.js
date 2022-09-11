import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom'
import { logout } from '../../actions/auth';
import { initSetMenu, initSetMenuHide } from '../../actions/ui';


export const NavbarDesktop = React.memo(() => {
    const dispatch = useDispatch();
    const { isMenu } = useSelector(state => state.ui);
    const { pathname } = useLocation()
    const setIsMenu = useCallback(
        () => {
            dispatch(initSetMenu())
        },
        [dispatch]
    )
    const HideMenuBar = () => {
        dispatch(initSetMenuHide())
    }

    const closeSession = () => {
        localStorage.clear();
        dispatch(logout());
    }

    return (
        <header className={`_d__grid ${isMenu ? '' : 'active'}`}>
            <div className={`__menu_desple  ${isMenu ? '' : 'active'}`}>
                <div className="__toogle_menu">
                    <img onClick={setIsMenu} src={`./assets/iconos/toogle${isMenu ? '-active' : ''}.svg`} className="__icon_close" alt="close" />
                </div>

                <div className="icons">
                    <div className="__content_menu">
                        <NavLink exact activeClassName="active_menu" className="__position_relative" to="/"

                        >
                            <div className="__icon_menu">
                                <div onClick={HideMenuBar} className="linkClick"></div>

                                <img id="iconMenu" src={`./assets/iconos/home${pathname === '/' ? '-active' : ''}.svg`} alt="home" />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>

                        <NavLink exact activeClassName="active_menu" className="__position_relative" to="/vehiculos">
                            <div className="__icon_menu">
                                <div onClick={HideMenuBar} className="linkClick"></div>
                                <img src={`./assets/iconos/icon-vehicle${pathname === '/vehiculos' ? '-active' : ''}.svg`} alt="home" />
                                <span>Vehículos</span>

                            </div>
                        </NavLink>


                        <NavLink exact activeClassName="active_menu" className="__position_relative" to="/personas">
                            <div className="__icon_menu">
                            <div onClick={HideMenuBar} className="linkClick"></div>
                                <img src="./assets/iconos/icon_person.svg" alt="personas" />
                                <span>Personas</span>
                            </div>

                        </NavLink>

                        <NavLink exact activeClassName="active_menu " className="__position_relative" to="/buscador">
                            <div className="__icon_menu">
                            <div onClick={HideMenuBar} className="linkClick"></div>

                                <img src="./assets/iconos/icon_grafic.svg" alt="home" />
                                <span>Reportes</span>
                            </div>
                        </NavLink>

                    </div>

                    <div className="pweroff">
                        <img onClick={closeSession}  src="/assets/iconos/closesession.svg" alt="iconPerson" />
                    </div>
                </div>
                
            </div>
            <div></div>
            <div className="__site_header_desktop contenedor">
                <div className="left_logo">
                    <img id="logoDataPerformance" src="../assets/imagenes/logo_large.png" alt="logo_qonteo" />
                </div>

                <div className="__center_text">
                    <div className="logo_soda">
                        <img id="logoSoda" src="../assets/imagenes/soda_logo.png" alt="soda_logo" />
                    </div>
                </div>
                <div className="__rigth_imgs">
                    <img src="./assets/iconos/noti.svg" alt="notification" />
                </div>
            </div>


        </header>
    )
})
