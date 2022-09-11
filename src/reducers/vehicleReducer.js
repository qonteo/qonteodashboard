import { types } from "../types/types"

const initialize={
    vehicleHours:[],
    vehicleDaysOfWeek:[],
    vehicleDaysOfMonth:[],
    totalToday:0,
    todayPercent:0,
    yesterdayTotal:0,
    weekTotal:0,
    weekPercent:0,
    monthTotal:0,
    maxHour:{},
    maxWeek:{},
    maxMonth:{}
}


export const vehicleReducer = (state =initialize, action) => {
    switch (action.type) {
        case types.dataVehicles:
            return {
                ...state,
                ...action.payload
            }
        case types.setHoursVehicles:
            return {
                ...state,
                ...action.payload
            }
        case types.setWeeksVehicles:
            return {
                ...state,
                ...action.payload
            }

        case types.setMonthsVehicles:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

