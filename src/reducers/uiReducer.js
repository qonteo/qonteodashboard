const { types } = require("../types/types");

const initialize={
    isMenu:false,
}

export const uiReducer=(state=initialize,action)=>{
    switch (action.type) {
        case types.uiMenu:
        return {
            isMenu:!state.isMenu
        }
        case types.uiMenuHide:
            return {
                isMenu:false
            }
        
        default:
            return state;
    }
}