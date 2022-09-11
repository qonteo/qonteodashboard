import moment from 'moment'
const { types } = require("../types/types");

const initialize = {
    dateStartHourVehicle: '2020-07-01',
    dateEndHourVehicle: moment().format('YYYY-MM-DD'),
    dateStartWeekVehicle: '2020-07-01',
    dateEndWeekVehicle: moment().format('YYYY-MM-DD'),
    dateStartMonthVehicle: '2020-07-01',
    dateEndMonthVehicle: moment().endOf('month').format("YYYY-MM-DD"),

    dateStartHourPerson: '2020-07-01',
    dateEndHourPerson: moment().format('YYYY-MM-DD'),
    dateStartHourMalePerson: '2020-07-01',
    dateEndHourMalePerson: moment().format('YYYY-MM-DD'),
    dateStartHourFemalePerson: '2020-07-01',
    dateEndHourFemalePerson: moment().format('YYYY-MM-DD'),
    dateStartWeekPerson: '2020-07-01',
    dateEndWeekPerson: moment().format('YYYY-MM-DD'),
    dateStartWeekMalePerson: '2020-07-01',
    dateEndWeekMalePerson: moment().format('YYYY-MM-DD'),
    dateStartWeekFemalePerson: '2020-07-01',
    dateEndWeekFemalePerson: moment().format('YYYY-MM-DD'),
    dateStartMonthPerson: '2020-07-01',
    dateEndMonthPerson: moment().endOf('month').format("YYYY-MM-DD"),
    dateStartMonthMalePerson: '2020-07-01',
    dateEndMonthMalePerson: moment().endOf('month').format("YYYY-MM-DD"),
    dateStartMonthFemalePerson: '2020-07-01',
    dateEndMonthFemalePerson: moment().endOf('month').format("YYYY-MM-DD"),
    dateStartAgePerson: '2020-07-01',
    dateEndAgePerson: moment().format('YYYY-MM-DD'),

    dateStartTypesVehicle: '2020-07-01',
    dateEndTypesVehicle: moment().format('YYYY-MM-DD'),

    dateStartPlate: '2020-07-01',
    dateEndPlate: moment().format('YYYY-MM-DD')
}

export const dateReducer = (state = initialize, action) => {
    switch (action.type) {
        case types.setDateStartHourVehicle:
            return {
                ...state,
                dateStartHourVehicle: action.payload
            }

        case types.setDateEndHourVehicle:
            return {
                ...state,
                dateEndHourVehicle: action.payload
            }

        case types.setDateStartWeekVehicle:
            return {
                ...state,
                dateStartWeekVehicle: action.payload
            }

        case types.setDateEndWeekVehicle:
            return {
                ...state,
                dateEndWeekVehicle: action.payload
            }
        case types.setDateStartMonthVehicle:
            return {
                ...state,
                dateStartMonthVehicle: action.payload
            }

        case types.setDateEndMonthVehicle:
            return {
                ...state,
                dateEndMonthVehicle: action.payload
            }

        case types.setDateStartHourPerson:
            return {
                ...state,
                dateStartHourPerson: action.payload
            }

        case types.setDateEndHourPerson:
            return {
                ...state,
                dateEndHourPerson: action.payload
            }
        case types.setDateStartHourMalePerson:
            return {
                ...state,
                dateStartHourMalePerson: action.payload
            }

        case types.setDateEndHourMalePerson:
            return {
                ...state,
                dateEndHourMalePerson: action.payload
            }
        case types.setDateStartHourFemalePerson:
            return {
                ...state,
                dateStartHourFemalePerson: action.payload
            }

        case types.setDateEndHourFemalePerson:
            return {
                ...state,
                dateEndHourFemalePerson: action.payload
            }

        case types.setDateStartWeekPerson:
            return {
                ...state,
                dateStartWeekPerson: action.payload
            }

        case types.setDateEndWeekPerson:
            return {
                ...state,
                dateEndWeekPerson: action.payload
            }

        case types.setDateStartWeekMalePerson:
            return {
                ...state,
                dateStartWeekMalePerson: action.payload
            }

        case types.setDateEndWeekMalePerson:
            return {
                ...state,
                dateEndWeekMalePerson: action.payload
            }

        case types.setDateStartWeekFemalePerson:
            return {
                ...state,
                dateStartWeekFemalePerson: action.payload
            }

        case types.setDateEndWeekFemalePerson:
            return {
                ...state,
                dateEndWeekFemalePerson: action.payload
            }

        case types.setDateStartMonthPerson:
            return {
                ...state,
                dateStartMonthPerson: action.payload
            }

        case types.setDateEndMonthPerson:
            return {
                ...state,
                dateEndMonthPerson: action.payload
            }

        case types.setDateStartMonthMalePerson:
            return {
                ...state,
                dateStartMonthMalePerson: action.payload
            }

        case types.setDateEndMonthMalePerson:
            return {
                ...state,
                dateEndMonthMalePerson: action.payload
            }

        case types.setDateStartMonthFemalePerson:
            return {
                ...state,
                dateStartMonthFemalePerson: action.payload
            }

        case types.setDateEndMonthFemalePerson:
            return {
                ...state,
                dateEndMonthFemalePerson: action.payload
            }


        case types.setDateStartAgePerson:
            return {
                ...state,
                dateStartAgePerson: action.payload
            }

        case types.setDateEndAgePerson:
            return {
                ...state,
                dateEndAgePerson: action.payload
            }


        case types.setDateStartPlate:
            return {
                ...state,
                dateStartPlate: action.payload
            }

        case types.setDateEndPlate:
            return {
                ...state,
                dateEndPlate: action.payload
            }
        default:
            return state;
    }
}
