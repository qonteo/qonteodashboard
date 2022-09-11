import { types } from "../types/types";

export const setStartDateHourVehicle=(data)=>({type:types.setDateStartHourVehicle,payload:data})
export const setEndDateHourVehicle=(data)=>({type:types.setDateEndHourVehicle,payload:data})

export const setStartDateWeekVehicle=(data)=>({type:types.setDateStartWeekVehicle,payload:data})
export const setEndDateWeekVehicle=(data)=>({type:types.setDateEndWeekVehicle,payload:data})

export const setStartDateMonthVehicle=(data)=>({type:types.setDateStartMonthVehicle,payload:data})
export const setEndDateMonthVehicle=(data)=>({type:types.setDateEndMonthVehicle,payload:data})


export const setStartDateHourPerson=(data)=>({type:types.setDateStartHourPerson,payload:data})
export const setEndDateHourPerson=(data)=>({type:types.setDateEndHourPerson,payload:data})

export const setStartDateHourMalePerson=(data)=>({type:types.setDateStartHourMalePerson,payload:data})
export const setEndDateHourMalePerson=(data)=>({type:types.setDateEndHourMalePerson,payload:data})

export const setStartDateHourFemalePerson=(data)=>({type:types.setDateStartHourFemalePerson,payload:data})
export const setEndDateHourFemalePerson=(data)=>({type:types.setDateEndHourFemalePerson,payload:data})

export const setStartDateWeekPerson=(data)=>({type:types.setDateStartWeekPerson,payload:data})
export const setEndDateWeekPerson=(data)=>({type:types.setDateEndWeekPerson,payload:data})


export const setStartDateWeekMalePerson=(data)=>({type:types.setDateStartWeekMalePerson,payload:data})
export const setEndDateWeekMalePerson=(data)=>({type:types.setDateEndWeekMalePerson,payload:data})

export const setStartDateWeekFemalePerson=(data)=>({type:types.setDateStartWeekFemalePerson,payload:data})
export const setEndDateWeekFemalePerson=(data)=>({type:types.setDateEndWeekFemalePerson,payload:data})

export const setStartDateMonthPerson=(data)=>({type:types.setDateStartMonthPerson,payload:data})
export const setEndDateMonthPerson=(data)=>({type:types.setDateEndMonthPerson,payload:data})


export const setStartDateMonthMalePerson=(data)=>({type:types.setDateStartMonthMalePerson,payload:data})
export const setEndDateMonthMalePerson=(data)=>({type:types.setDateEndMonthMalePerson,payload:data})

export const setStartDateMonthFemalePerson=(data)=>({type:types.setDateStartMonthFemalePerson,payload:data})
export const setEndDateMonthFemalePerson=(data)=>({type:types.setDateEndMonthFemalePerson,payload:data})

export const setStartDateAgePerson=(data)=>({type:types.setDateStartAgePerson,payload:data})
export const setEndDateAgePerson=(data)=>({type:types.setDateEndAgePerson,payload:data})



export const setStartDatePlate=(data)=>({type:types.setDateStartPlate,payload:data})
export const setEndDatePlate=(data)=>({type:types.setDateEndPlate,payload:data})
export const setDate=(start,startvalue,end,endvalue) => ({
    type: types.changeDate,
    start,
    startvalue,
    end,
    endvalue
})