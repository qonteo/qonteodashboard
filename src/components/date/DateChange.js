import React, {useState } from 'react'
import moment from 'moment'
import es from 'date-fns/locale/es';
import Swal from 'sweetalert2'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from 'react-redux';

registerLocale('es', es)

export const DateChange = React.memo(({startDate,endDate,method,methodStart,methodEnd,flexColumn=true,isPlate=false,methodPlate,inputReset}) => {
    const dispatch = useDispatch();
    const [startDateValue, setStartDateValue] = useState(new Date(startDate))
    const [endDateValue, setEndDateValue] = useState(new Date(endDate))

    const changeInitDate=(date)=>{
    
        const momentStart=moment(date);
        const momentEnd=moment(endDateValue);
        if(momentStart.isAfter(momentEnd)){
            return Swal.fire('Error','La fecha Inicio debe ser menor que la fecha de fin','error')
        }

        setStartDateValue(date)
        dispatch(method(moment(date).format('YYYY-MM-DD'),moment(endDateValue).format('YYYY-MM-DD')))
        dispatch(methodStart(moment(date).format('YYYY-MM-DD')))
        if(isPlate){
            methodPlate(1)
        }
        if(inputReset){
            document.querySelector(inputReset).value=''
        }
    }
    

    const changeEndDate=(date)=>{
        const momentStart=moment(startDateValue);
        const momentEnd=moment(date);
        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error','La fecha fin debe ser mayor que la fecha de inicio','error')
        }
        setEndDateValue(date)
        dispatch(method(moment(startDateValue).format('YYYY-MM-DD'),moment(date).format('YYYY-MM-DD')))    
        dispatch(methodEnd(moment(date).format('YYYY-MM-DD')))
        if(isPlate){
            methodPlate(1)
        }
        if(inputReset){
            document.querySelector(inputReset).value=''
        }
    }




    return (
        <div className={`__date_change ${flexColumn ? '__flex_column' : '' } `}>
            <div className="content_date">
                <img src="./assets/iconos/Calendario.png" className="icon_inputS" alt="icon calendario" />
                <DatePicker
                    selected={startDateValue}
                    locale="es"
                    onChange={changeInitDate}
                    format='yyyy-MM-dd'
                    maxDate={new Date()}
                    
                />
            </div>
            <div className="content_date">
                <img src="./assets/iconos/Calendario.png" className="icon_inputS" alt="icon calendario" />
                <DatePicker
                    selected={endDateValue}
                    locale="es"
                    onChange={changeEndDate}
                    format='yyyy-MM-dd'
                    maxDate={new Date()}

                />
            </div>
        </div>
    )
})
