import { useState } from "react"
import moment from 'moment'

export const useDate = (startDate,endDate,method,month=false) => {
    const [startDateValue, setStartDateValue] = useState(new Date(startDate))
    const [endDateValue, setEndDateValue] = useState(new Date(endDate))
       console.log('Me volvio a llamar :c')     
    const changeInitDate=(date)=>{
        setStartDateValue(date)
        method(moment(date).format('YYYY-MM-DD'),moment(endDateValue).format('YYYY-MM-DD'))
    }
    

    const changeEndDate=(date)=>{
        setEndDateValue(date)
        method(moment(startDateValue).format('YYYY-MM-DD'),moment(date).format('YYYY-MM-DD'))    
    }
    
    return [startDateValue,endDateValue,changeInitDate,changeEndDate];

}