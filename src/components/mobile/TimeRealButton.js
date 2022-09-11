import React, { useCallback, useState } from 'react'

export const TimeRealButton = React.memo(({ dispath, method }) => {

    const [isTimeReal, setTimeReal] = useState(true)
    const [isInterval, setIsInterval] = useState(null)
    const callbackTimeReal = useCallback(() => {
        if (isTimeReal) {
            const idInterval = setInterval(() => {
                dispath(method())
            }, 2000);
            setIsInterval(idInterval);
        }
        return clearInterval(isInterval)
    }, [dispath, setIsInterval, isInterval, isTimeReal, method])

    const activeRefresh = () => {
        window.location.reload()
    }

    return (
        <div className="__botones_nav __timereal_refresh" name="vehicles" >
            <div onClick={() => {
                setTimeReal(!isTimeReal)
                callbackTimeReal()
            }} className="__btn_navegation_ __icon_caledare"><img src="./assets/iconos/Calendario.png" alt="Time Real" /> Tíempo real</div>
            <div onClick={activeRefresh} className="__btn_navegation_ __icon_caledare"><img src="./assets/iconos/Calendario.png" alt="icon calendario" /> Actualizar</div>
        </div>
    )
})