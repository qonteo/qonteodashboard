import React from 'react'

import {formatNumber } from '../../helpers/calculo';

export const BoxSecondary = React.memo(({count,percent=0, text1,text2,ispercent=false,initDate=null,endDate=null}) => {
    return (
        <div className="box_2 box bg-white mt">
            <div className="content">
                <div className="header_box percent" id="uiayerper1">
                    
                    { 
                    (percent===0 && ispercent===false && initDate==null && endDate==null) ? (<span></span>)
                    :
                    initDate!==null  ? (<><span>{initDate}</span><span>{endDate}</span></>) : 
                    percent>=0
                        ?
                        (
                        <>
                        <img className="arrow_e"
                        src="../assets/iconos/icon-flecha.png" 
                        alt="box_percent" />
                        
                        <span className='positive_num' >+ {percent} %</span>
                        </>
                        )
                        : 
                        (
                        <>
                        <img className="arrow_e"
                        src="../assets/iconos/arrow_low.png" 
                        alt="box_percent" />
                        <span className='negative_num'> {percent} %</span>
                        </>
                        )
                    }
                   </div>
                <div className="body_box mobil">
                    <div className="number" id="uiayer1">{formatNumber(count)}</div>
                    <span>{text1}</span>
                    <span>{text2}</span>
                </div>
            </div>
        </div>
    )
})
