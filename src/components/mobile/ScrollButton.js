import React from 'react'

export const ScrollButton = React.memo(({ refVehicle, refPerson,active }) => {
    const handleScrollVehicles = () => {
        window.scrollTo(0, document.getElementById(refVehicle).offsetTop)
    }
    const handleScrollPerson = () => {
        window.scrollTo(0, document.getElementById(refPerson).offsetTop)
    }

    return (
        <div className="__botones_nav">
            <div onClick={handleScrollVehicles} className={`__btn_navegation_ ${active==='vehicle' ? 'active' : ''} `}><img src={`./assets/iconos/icon-car${active==='vehicle' ? '-active' : ''}.svg`} alt="icon car" /> Vehículos</div>
            <div onClick={handleScrollPerson} className={`__btn_navegation_ ${active==='person' ? 'active' : ''} `}><img src={`./assets/iconos/icon-group${active==='person' ? '-active' : ''}.svg`} alt="icon scroll" /> Personas</div>
        </div>
    )
})