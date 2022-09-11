import React from 'react'
import { formatNumber, porcentajepersona } from '../../helpers/calculo'

export const BoxSex = React.memo(({ total=0,count=100, textsex,bg='primary',color='grey',sex='men',txttop=null,textBottom='' }) => {
    
    return (
        <div className={`box person bg-${bg}`}>
            <div className="content text-center">
                {txttop && <span className={`text-${color} _text_day_box`}>{txttop}</span>}
                <div className="header_box percent icon_person">

                    <img className="imgperson"
                    src={`../assets/iconos/${sex}-${color}.svg`} alt="box_percent" /></div>
                
                <div className="body_box mobil">
                    <div className={`number text-${color}`} id="uipersonm1">{formatNumber(count)}</div>
                    <span className={`text-${color}`}>{textsex}</span>
                    {textBottom!=='' ? 
                    <span className={`text-${color}`}>{textBottom}</span>    
                    :
                    <span className={`text-${color}`} id="uipersonperce1m">{(isNaN(porcentajepersona(total,count)) || porcentajepersona(total,count)===Number.POSITIVE_INFINITY ) ? 0 : porcentajepersona(total,count) } %</span>
                    }
                    
                    </div>
            </div>
        </div>
    )
})
