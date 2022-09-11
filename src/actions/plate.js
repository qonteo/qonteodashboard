import { types } from "../types/types";
import { fetchConToken } from "../helpers/fetch";


export const PlateData = (offset=0,q,rangeDate) => {
    return async (dispatch,getState) => {
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code==='CO.PMXCO.BOG.A01')[0].id;
        dispatch(initLoading())
        const resp = await fetchConToken(`/search?offset=${offset}${!!q ? '&q='+q : ''}${!!rangeDate ? rangeDate : ''}&group_id=${groupId}`);
        const body = await resp.json();
        const totalPlates= body.plates;
        const topPLateMonth = body.top_plate_month;
        const countPlate=body.total;
        const topPlate = body?.top_plate;
        dispatch(inicialdataplate({
            topPlate,
            topPLateMonth,
            totalPlates,
            countPlate
        }))

    }


}

export const PlateSearch = (q = '') => {
    return async (dispatch,getState) => {
        dispatch(initLoading())
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code==='CO.PMXCO.BOG.A01')[0].id;
        const resp = await fetchConToken(`/search?q=${q}&group_id=${groupId}`);
        const body = await resp.json();
        const totalPlates = body.plates;
        const countPlate=body.total;
        dispatch(inicialplatesearch({
            totalPlates,
            countPlate
        }))

    }
}

export const setDatePlates = (date_from,date_to) => {
    return async (dispatch,getState) => {
        dispatch(initLoading())
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code==='CO.PMXCO.BOG.A01')[0].id;
        const resp = await fetchConToken(`/search?date_from=${date_from}&date_to=${date_to}&group_id=${groupId}`);
        const body = await resp.json();
        const totalPlates = body.plates;
        const countPlate=body.total;
        const topPLateMonth=body.top_plate_month;
        dispatch(initChangeDate({
            totalPlates,
            countPlate,
            topPLateMonth
        }))
    }
}


export const initLoading=()=>({type:types.startLoadingPlate})

const inicialdataplate = (data) => ({
    type: types.getPlate,
    payload: data
})

const inicialplatesearch = (data) => ({
    type: types.searchPlate,
    payload: data
})




export const initSortByPlate=()=>({type:types.sortByPlate})

export const initSortByDate=()=>({type:types.sortByDate})

export const initSortByHour=()=>({type:types.sortByHour})
export const initSortByLocation=()=>({type:types.sortByLocation})

export const initSortByTimes=()=>({type:types.sortByTimes})
export const initSortByClient=()=>({type:types.sortByClient})

export const initSortByMembership=()=>({type:types.sortByMembership})

export const initChangeDate=(data)=>({type:types.setPlatesCurrenDate,payload:data})