import React from 'react'

export const BoxPLate = React.memo(({date,textTop,plate='GGV97F',nveces=0}) => {
    return (
        <div className={`box_v1 box`}>
            <div className="header_box text-primary uifecha_t">{date}</div>
            <div className="body_box">
                <span className="text-primary text-uppercase">{textTop}</span>
                <div className="number text-primary" id="uihoy1">{plate}</div>
                <span className="text-primary text-normal">Ha pasado {nveces} veces</span>
            </div>
        </div>
    )
})
