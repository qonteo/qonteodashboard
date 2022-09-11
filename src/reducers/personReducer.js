import { types } from "../types/types"

const initialize={
    hoursPerson:[],
    hoursPersonFemale:[],
    hoursPersonMale:[],
    weekPerson:[],
    weekPersonMale:[],
    weekPersonFemale:[],
    monthPerson:[],
    monthPersonFemale:[],
    monthPersonMale:[],
    heatmapPerson:[],
    heatmapRangePerson:[],
    ageRangePerson:[],
    totalTodayPerson:0,
    totalTodayPersonFemale:0,
    totalTodayPersonMale:0,
    todayPercentPerson:0,
    todayPercentFemalePerson:0,
    todayPercentMalePerson:0,
    totalYesterdayPerson:0,
    totalYesterdayFemalePerson:0,
    totalYesterdayMalePerson:0,
    maxHourPerson:[],
    maxHourFemalePerson:[],
    maxHourMalePerson:[],
    maxWeekPerson:[],
    maxWeekFemalePerson:[],
    maxWeekMalePerson:[],
    maxMonthPerson:[],
    maxMonthFemalePerson:[],
    maxMonthMalePerson:[],
    totalWeekPerson:0,
    totalWeekFemale:0,
    totalWeekMale:0,
    weekPercentPerson:0,
    totalMonthPerson:0,
    totalMonthFemalePerson:0,
    totalMonthMalePerson:0
}



export const personReducer = (state = initialize, action) => {
    switch (action.type) {
      case types.dataPersons:
        return {
          ...state,
          ...action.payload
        }
      case types.setHoursPersons:
        return {
          ...state,
          ...action.payload
  
        }
  
      case types.setHoursPersonsMale:
        return {
          ...state,
          ...action.payload
        }
      case types.setHoursPersonsFemale:
        return {
          ...state,
          ...action.payload
        }
  
      case types.setWeekPersons:
        return {
          ...state,
          ...action.payload
  
        }
  
      case types.setWeekPersonsMale:
        return {
          ...state,
          ...action.payload
        }
      case types.setWeekPersonsFemale:
        return {
          ...state,
          ...action.payload
        }
  
      case types.setMonthGraficPersons:
        return {
          ...state,
          ...action.payload
  
        }
  
      case types.setMonthGraficPersonsMale:
        return {
          ...state,
          ...action.payload
        }
      case types.setMonthGraficPersonsFemale:
        return {
          ...state,
          ...action.payload
        }
  
      case types.setGraficRangesAges:
        return {
          ...state,
          ...action.payload
        }
      default:
        return state;
    }
  }
  
  