import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const getStartVehicles = () => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        try {
            const resp = await fetchConToken(`/get-vehicle-graphics?group_id=${groupId}`),
                body = await resp.json();
            const { today_total, yesterday_total, week_total, month_total, hours,
                week, month, today_percent, week_percent, max_hour, max_week_day,
                max_month_day } = body;
               
            dispatch(getVehicles({
                vehicleHours: hours,
                vehicleDaysOfWeek: week,
                vehicleDaysOfMonth: month,
                totalToday: today_total,
                todayPercent: today_percent,
                yesterdayTotal: yesterday_total,
                weekTotal: week_total,
                weekPercent: week_percent,
                monthTotal: month_total,
                maxHour: max_hour,
                maxWeek: max_week_day,
                maxMonth: max_month_day
            }))
        } catch (error) {
            console.log(error)
        }
    }
}

export const setHoursVehicles = (date_from,date_to) => {
    console.log(date_from,date_to)
    
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/?date_from=${date_from}&group_id=${groupId}&date_to=${date_to}&resource=&group_id=${groupId}`);
        const body = await resp.json();
        const {hours,max_hour}=body;
        dispatch(setHoursGrafic({
            vehicleHours:hours,
            maxHour:max_hour
        }))
    }
}

export const setWeekVehicles = (date_from,date_to) => {
    return async (dispatch,getState) => {
         const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-vehicle-graphics?date_from=${date_from}&group_id=${groupId}&date_to=${date_to}`);
        const body = await resp.json();
        const {week,max_week_day}=body
        dispatch(setWeekGrafic({
            vehicleDaysOfWeek:week,
            maxWeek:max_week_day
        }))
    }
}


export const setMonthVehicles = (date_from,date_to) => {
    return async (dispatch,getState) => {
         const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-vehicle-graphics?date_from=${date_from}&group_id=${groupId}&date_to=${date_to}`);
        const body = await resp.json();
        const {month,max_month_day}=body;
        dispatch(setMonthGrafic({
            vehicleDaysOfMonth:month,
            maxMonth:max_month_day
        }))
    }
}

export const pruevaSaludarVehicle=(date1,date2)=>{
    console.log(date1,date2)
}

export const setStartHoursVehicle = (date_from, date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        try {
            const resp = await fetchConToken(`/get-vehicle-graphics?date_from=${date_from}&group_id=${groupId}&date_to=${date_to}`);
            const body = await resp.json();
            const { hours, max_hour } = body;
            dispatch(setHoursVehicle({
                vehicleHours: hours,
                maxHour: max_hour
            }))
        } catch (error) {
            console.log(error)
        }
    }
}

export const setStartWeekVehicle = (date_from, date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        try {
            const resp = await fetchConToken(`/get-vehicle-graphics?date_from=${date_from}&group_id=${groupId}&date_to=${date_to}`);
            const body = await resp.json();
            const { week, max_week_day } = body
            dispatch(setWeekVehicle({
                vehicleDaysOfWeek: week,
                maxWeek: max_week_day
            }))
        } catch (error) {
            console.log(error)
        }
    }
}

export const setStartMonthVehicles = (date_from, date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        try {
            const resp = await fetchConToken(`/get-vehicle-graphics?date_from=${date_from}&group_id=${groupId}&date_to=${date_to}`);
            const body = await resp.json();
            const { month, max_month_day } = body;
            dispatch(setMonthVehicle({
                vehicleDaysOfMonth: month,
                maxMonth: max_month_day
            }))
        } catch (error) {
            console.log(error)
        }
    }
}
const getVehicles = (data) => ({
    type: types.dataVehicles,
    payload: data
})
const setHoursVehicle = (data) => ({
    type: types.setHoursVehicles,
    payload: data
})
const setWeekVehicle = (data) => ({
    type: types.setWeeksVehicles,
    payload: data
})
const setMonthVehicle = (data) => ({
    type: types.setMonthsVehicles,
    payload: data
})
const setHoursGrafic = (data) => ({
    type: types.setHoursVehicles,
    payload: data
})

const setWeekGrafic = (data) => ({
    type: types.setWeeksVehicles,
    payload: data
})

const setMonthGrafic = (data) => ({
    type: types.setMonthsVehicles,
    payload: data
})
