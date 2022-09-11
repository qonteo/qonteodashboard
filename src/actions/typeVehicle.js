import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";
export const getTypesVehicle=()=>{
    return async (dispatch,getState)=>{
        const {groups}=getState().auth;
        const groupId=groups.filter(g=>g.code===types.groupName)[0].id;
        const resp = await fetchConToken(`/get-vehicle-types?group_id=${groupId}`),
        body = await resp.json();
        const [bus,car,bike,suv,truck,other,van]=body.types;
        const {today_total,today_percent,yesterday_total,week_total,week_percent,total,creation_date,current_date}=body;


        dispatch(typeVehicle({
            bus:bus.bus,car:car.car,bike:bike.bike,suv:suv.suv,truck:truck.truck,other:other.other,van:van.van,
            countTodayTypes:today_total,
            todayPercentTypes:today_percent,
            countYesterdayTypes:yesterday_total,
            countWeekTypes:week_total,
            weekPercentTypes:week_percent,
            countTypes:total,
            creationDate:creation_date,
            currentDate:current_date
        }))
    }  
}

const typeVehicle=(data)=>({type:types.dataTypeVehicle,payload:data})