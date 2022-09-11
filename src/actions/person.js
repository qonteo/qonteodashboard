import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const getPersondata = () => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-person-graphics?heatmap_p=true&age_range_p=true&group_id=${groupId}`);
        const body = await resp.json();
        const { today_total, today_female, today_male, heatmap, heatmap_range,
            yesterday_total, yesterday_female, yesterday_male,
            week_total, week_female, week_male,
            month_total, month_female, month_male,
            hours, week, month,
            ageRanges, today_percent, today_percent_female, today_percent_male, week_percent,
            max_hour, max_hour_female, max_hour_male,
            max_week_day, max_week_day_female, max_week_day_male,
            max_month_day, max_month_day_female,
            max_month_day_male } = body;

        const linehoyhoursT = hours.map(h => {
            return {
                "time": h.time,
                "hour": h.hour,
                "total": h.total
            }
        })

        const linehoyhoursM = hours.map(h => {
            return {
                "time": h.time,
                "hour": h.hour,
                "male": h.male
            }
        })
        const linehoyhoursF = hours.map(h => {
            return {
                "time": h.time,
                "hour": h.hour,
                "female": h.female
            }
        })
        const linehoursweekT = week.map(h => {
            return {
                "dow": h.dow,
                "total": h.total
            }
        })

        const linehoursweekM = week.map(h => {
            return {
                "dow": h.dow,
                "male": h.male
            }
        })
        const linehoursweekF = week.map(h => {
            return {
                "dow": h.dow,
                "female": h.female
            }
        })
        const lineMonthT = month.map(h => {
            return {
                "day": h.day,
                "total": h.total
            }
        })
        const lineMonthM = month.map(h => {
            return {
                "day": h.day,
                "male": h.male
            }
        })
        const lineMonthF = month.map(h => {
            return {
                "day": h.day,
                "female": h.female
            }
        })

        dispatch(getData({
            hoursPerson: linehoyhoursT,
            hoursPersonFemale: linehoyhoursF,
            hoursPersonMale: linehoyhoursM,
            weekPerson: linehoursweekT,
            weekPersonMale: linehoursweekM,
            weekPersonFemale: linehoursweekF,
            monthPerson: lineMonthT,
            monthPersonFemale: lineMonthF,
            monthPersonMale: lineMonthM,
            heatmapPerson: heatmap,
            heatmapRangePerson: heatmap_range,
            ageRangePerson: ageRanges,
            totalTodayPerson: today_total,
            totalTodayPersonFemale: today_female,
            totalTodayPersonMale: today_male,
            todayPercentPerson: today_percent,
            todayPercentFemalePerson: today_percent_female,
            todayPercentMalePerson: today_percent_male,
            totalYesterdayPerson: yesterday_total,
            totalYesterdayFemalePerson: yesterday_female,
            totalYesterdayMalePerson: yesterday_male,
            maxHourPerson: max_hour,
            maxHourFemalePerson: max_hour_female,
            maxHourMalePerson: max_hour_male,
            maxWeekPerson: max_week_day,
            maxWeekFemalePerson: max_week_day_female,
            maxWeekMalePerson: max_week_day_male,
            maxMonthPerson: max_month_day,
            maxMonthFemalePerson: max_month_day_female,
            maxMonthMalePerson: max_month_day_male,
            totalWeekPerson: week_total,
            totalWeekFemale: week_female,
            totalWeekMale: week_male,
            weekPercentPerson: week_percent,
            totalMonthPerson: month_total,
            totalMonthFemalePerson: month_female,
            totalMonthMalePerson: month_male
        }))
    }
}

export const setHoursPersons = (date_from,date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
      
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&date_to=${date_to}&group_id=${groupId}`);
        const body = await resp.json();
        const linehoyhours = body.hours;
        const linehoyhoursT=linehoyhours.map(h=>{
            return {
                "time":h.time,
                "hour":h.hour,
                "total":h.total
            }
        })
        const max_hour = body.max_hour;
        dispatch(initSetGraficHoursPersons({
            hoursPerson:linehoyhoursT,
            maxHourPerson:max_hour
        }))
    }
}


export const setHoursPersonsMale = (date_from,date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&date_to=${date_to}&group_id=${groupId}`);
        const body = await resp.json();
        console.log(body)
        const linehoyhours = body.hours;
        const linehoyhoursM=linehoyhours.map(h=>{
            return {
                "time":h.time,
                "hour":h.hour,
                "male":h.male
            }
        })
        const max_hour_male = body.max_hour_male;
        dispatch(initSetGraficHoursPersonsMale({
            hoursPersonMale:linehoyhoursM,
            maxHourMalePerson:max_hour_male
        }))
    }

}

export const setHoursPersonsFemale = (date_from,date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&date_to=${date_to}&group_id=${groupId}`);
        const body = await resp.json();
        console.log(body)
        const linehoyhours = body.hours;
        const linehoyhoursF=linehoyhours.map(h=>{
            return {
                "time":h.time,
                "hour":h.hour,
                "female":h.female
            }
        })
        const max_hour_female = body.max_hour_female;
        dispatch(initSetGraficHoursPersonsFemale({
            hoursPersonFemale:linehoyhoursF,
            maxHourFemalePerson:max_hour_female
        }))
    }

}
/****WEEK */

export const setWeekPersons = (date_from,date_to) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&date_to=${date_to}`);
        const body = await resp.json();
        const linehoursweek = body.week;
        const linehoursweekT=linehoursweek.map(h=>{
            return {
                "dow":h.dow,
                "total":h.total
            }
        })
        const max_week_dayP = body.max_week_day;
        dispatch(initSetGraficWeekPersons({
            weekPerson:linehoursweekT,
            maxWeekPerson:max_week_dayP
        }))
    }

}
export const setWeekPersonsMale = (date_from,date_to) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&date_to=${date_to}`);
        const body = await resp.json();
        const linehoursweek = body.week;
        const linehoursweekM=linehoursweek.map(h=>{
            return {
                "dow":h.dow,
                "male":h.male
            }
        })
        const max_week_day_male = body.max_week_day_male;
        dispatch(initSetGraficWeekPersonsMale({
            weekPersonMale: linehoursweekM,
            maxWeekMalePerson:max_week_day_male
        }))
    }

}


export const setWeekPersonsFemale = (date_from,date_to) => {
    return async (dispatch) => {
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&date_to=${date_to}`);
        const body = await resp.json();
        const linehoursweek = body.week;
        const linehoursweekF=linehoursweek.map(h=>{
            return {
                "dow":h.dow,
                "female":h.female
            }
        })
        const max_week_day_female = body.max_week_day_female;
        dispatch(initSetGraficWeekPersonsFemale({
            weekPersonFemale:linehoursweekF,
            maxWeekFemalePerson:max_week_day_female
        }))
    }

}

/******MONTH PERSONS */

export const setMonthPerson = (date_from,date_to) => {
    return async (dispatch,getState) => {
         const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code==='CO.PMXCO.BOG.A01')[0].id;
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&group_id=${groupId}date_to=${date_to}`);
        const body = await resp.json();
        const lineMonth = body.month;

        const lineMonthT=lineMonth.map(h=>{
            return {
                "day":h.day,
                "total":h.total
            }
        })
        const max_month_dayP = body.max_month_day;
        dispatch(initSetGraficMonthPerson({
            monthPerson:lineMonthT,
            maxMonthPerson:max_month_dayP
        }))
    }

}

export const setMonthPersonMale = (date_from,date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&group_id=${groupId}date_to=${date_to}`);
        const body = await resp.json();
        const lineMonth = body.month;

        const lineMonthM=lineMonth.map(h=>{
            return {
                "day":h.day,
                "male":h.male
            }
        })
        const max_month_day_male = body.max_month_day_male;
        dispatch(initSetGraficMonthPersonMale({
            monthPersonMale:lineMonthM,
            maxMonthMalePerson:max_month_day_male
        }))
    }

}


export const setMonthPersonFemale = (date_from,date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&group_id=${groupId}date_to=${date_to}`);
        const body = await resp.json();
        const lineMonth = body.month;

        const lineMonthF=lineMonth.map(h=>{
            return {
                "day":h.day,
                "female":h.female
            }
        })
        const max_month_day_female = body.max_month_day_female;
        dispatch(initSetGraficMonthPersonFemale({
            monthPersonFemale:lineMonthF,
            maxMonthFemalePerson:max_month_day_female
        }))
    }

}

export const setGraficRangeAges = (date_from,date_to) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-person-graphics?date_from=${date_from}&group_id=${groupId}date_to=${date_to}&age_range_p=true`);
        const body = await resp.json();
        const {ageRanges}=body;
        dispatch(initSetGraficRangeAges({
            ageRangePerson:ageRanges
        }))
    }

}

const getData = (data) => ({
    type: types.dataPersons,
    payload: data
})

const initSetGraficHoursPersons = (data) => ({
    type: types.setHoursPersons,
    payload: data
})

const initSetGraficHoursPersonsMale = (data) => ({
    type: types.setHoursPersonsMale,
    payload: data
})

const initSetGraficHoursPersonsFemale = (data) => ({
    type: types.setHoursPersonsFemale,
    payload: data
})



const initSetGraficWeekPersons = (data) => ({
    type: types.setWeekPersons,
    payload: data
})

const initSetGraficWeekPersonsMale = (data) => ({
    type: types.setWeekPersonsMale,
    payload: data
})

const initSetGraficWeekPersonsFemale = (data) => ({
    type: types.setWeekPersonsFemale,
    payload: data
})

const initSetGraficMonthPerson = (data) => ({
    type: types.setMonthGraficPersons,
    payload: data
})

const initSetGraficMonthPersonMale = (data) => ({
    type: types.setMonthGraficPersonsMale,
    payload: data
})

const initSetGraficMonthPersonFemale = (data) => ({
    type: types.setMonthGraficPersonsFemale,
    payload: data
})

const initSetGraficRangeAges = (data) => ({
    type: types.setGraficRangesAges,
    payload: data
})
