import React from 'react'


export const BoxPrimary = React.memo(({ date, cantidad=0, text1, text2,bg='bg-primary',textHeadLeft='',textBottom='',dateEnd='' }) => {
    return (
        <div className={`box_v1 box ${bg}`}>
            <div className={`header_box uifecha_t ${textHeadLeft && '_d_flex_btw'}`}>
                {textHeadLeft!=='' && (<img src={`./assets/iconos/${textHeadLeft}`} alt="icon_vehicle"/>)}
                {dateEnd!=='' ? (<div className="__d_flex __flex_column">
                        <span>{date}</span>
                    <span>{dateEnd}</span></div>)
                    :
                    <span>{date}</span>
                }
            </div>
            <div className="body_box">
                {textBottom==='' && <span className="text-white text-uppercase">{text2}</span>}
                <div className="number" id="uihoy1">{cantidad}</div>
                <span className="text-white text-normal">{text1}</span>
                {textBottom!=='' && <span className="text-white">{textBottom}</span>}
            </div>
        </div>
    )
})
