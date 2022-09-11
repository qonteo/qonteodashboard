import React from 'react'

export const BoxRangeTime = () => {
    return (
        <div className="__box_range_vehicle bg-primary">
            <div className="__head_range_vehicle">
                <div></div>
                <div className="title_box_range">TOTAL VEHICULOS ACUMULADO</div>
                <div className="date_range_box">12-07-2020</div>
            </div>
           
            <div className="__body_range_vehicle">
                <div className="number_box_range">
                    <div className="number">3099</div>
                    <div className="text">Carros</div>
                </div>
                <div className="number_box_range">
                    <div className="number">3099</div>
                    <div className="text">Carros</div>
                </div>
                <div className="number_box_range">
                    <div className="number">3099</div>
                    <div className="text">Carros</div>
                </div>
            </div>
            <div className="__footer_range_vehicle">
                ENTRE LAS 12:00HRS - 20:00HRS
            </div>
        </div>
    )
}
