import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { dateReducer } from "./DateReducer";
import { personReducer } from "./personReducer";
import { plateReducer } from "./plateReducer";
import { typeVehicleReducer } from "./typesVehicleReducer";
import { uiReducer } from "./uiReducer";
import { vehicleReducer } from "./vehicleReducer";

export const rootReducer=combineReducers({
    auth:authReducer,
    vehicle:vehicleReducer,
    person:personReducer,
    date:dateReducer,
    ui:uiReducer,
    plate:plateReducer,
    typeVehicle:typeVehicleReducer
})