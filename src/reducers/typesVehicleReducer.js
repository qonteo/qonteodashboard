import moment from 'moment'
const { types } = require("../types/types");

const init={
bus:{},
car:{},
bike:{},
suv:{},
truck:{},
other:{},
van:{},
countTodayTypes:0,
todayPercentTypes:0,
countYesterdayTypes:0,
countWeekTypes:0,
weekPercentTypes:0,
countTypes:0,
creationDate:'2020-07-11',
currentDate:moment().format('YYYY-MM-DD')
}

export const typeVehicleReducer=(state=init,action)=>{
    switch (action.type) {
        case types.dataTypeVehicle:
               return {
                   ...state,
                   ...action.payload
               }
    
        default:
            return state;
    }
}