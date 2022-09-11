import { types } from "../types/types"

const initial = {
    topPlate: {},
    topPLateMonth: {},
    isLoading: true,
    countPlate: 0,
    totalPlates: [],
    isTimes: 1,
    isSortPlate: 1,
    isSortDate: 1,
    isSortByHour: 1,
    isSortByLocation: 1,
    isSortByClient: 1,
    isSortByMembership: 1
}

export const plateReducer = (state = initial, action) => {
    switch (action.type) {
        case types.getPlate:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case types.startLoadingPlate:
            return {
                ...state,
                totalPlates: [],
                isLoading: true
            }
        case types.searchPlate:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        case types.sortByPlate:
            return {
                ...state,
                totalPlates: state.totalPlates.sort((a, b) => a.plate > b.plate ? state.isSortPlate * -1 : state.isSortPlate),
                isSortPlate: state.isSortPlate * -1,
            }
        case types.sortByDate:
            return {
                ...state,
                totalPlates: state.totalPlates.sort((a, b) => a.date > b.date ? state.isSortDate * -1 : state.isSortDate),
                isSortDate: state.isSortDate * -1,
            }
        case types.sortByHour:
            return {
                ...state,
                totalPlates: state.totalPlates.sort((a, b) => a.time > b.time ? state.isSortByHour * -1 : state.isSortByHour),
                isSortByHour: state.isSortByHour * -1,

            }

        case types.sortByLocation:
            return {
                ...state,
                totalPlates: state.totalPlates.sort((a, b) => a.location > b.location ? state.isSortByLocation * -1 : state.isSortByLocation),
                isSortByLocation: state.isSortByLocation * -1,

            }

        case types.sortByTimes:
            return {
                ...state,
                totalPlates: state.totalPlates.sort((a, b) => {
                    const num1=parseInt(a.occurency);
                    const num2=parseInt(b.occurency);

                    return num1 < num2 ? state.isTimes * -1 : state.isTimes
                }),
                isTimes: state.isTimes * -1
            }
        case types.sortByClient:
            return {
                ...state,
                totalPlates: state.totalPlates.sort((a, b) => a.client_p > b.client_p ? state.isSortByClient * -1 : state.isSortByClient),
                isSortByClient: state.isSortByClient * -1,

            }
        case types.sortByMembership:
            return {
                ...state,
                totalPlates: state.totalPlates.sort((a, b) => a.membership_p > b.membership_p ? state.isSortByMembership * -1 : state.isSortByMembership),
                isSortByMembership: state.isSortByMembership * -1
            }

        case types.setPlatesCurrenDate:
            return {
                ...state,
                ...action.payload,
                isLoading: false
            }
        default:
            return state
    }
}