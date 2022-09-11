import { types } from "../types/types";

const initialState = {
    isCheking: false,
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                isCheking: false,
                ...action.payload
            }
        case types.authCheckingFinish:
            return {
                ...state,
                isCheking: true,
            }
        case types.authChecking:
            return {
                isCheking: true,
            }
        default:
            return state;
    }
}