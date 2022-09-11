import { fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types';
import swal from 'sweetalert2'

export const startLogin = ({ token, user },groupId) => {
    return async (dispatch) => {

        localStorage.setItem('token-qonteo',`bear ${token}`)
        localStorage.setItem('id-user-qonteo', user._id)
        localStorage.setItem('group-id-qonteo',groupId.toString())
        localStorage.setItem('token-init-date-qonteo', new Date().getTime())
        dispatch(login({
            uid: user._id,
            firstNames: user.firstNames,
            lastName: user.lastName,
            email: user.email,
            phonenumber: user.phonenumber,
            portraitUrl: user.portrait_url,
            country: user.country,
            groups:user.groups,
            city: user.city,
            isCheking:true
        }))
    }
}


export const startRegister = (firstName, lastName, email, password) => {
    return async () => {
       try {
        const resp = await fetchSinToken('register', { email, firstName, lastName, password }, 'POST');
        const body = await resp.json();
        if (!body.meta.status) {
            console.log("there was an error creating the user")
        }
       } catch (error) {
         console.log(error)  
       }
    }
}


export const startChecking = (dispatch) => {
    return async(dispatch) => {
        const token=localStorage.getItem('token-qonteo') || '';
        
        if(token){
            try {
            
                    const resp = await (await fetchSinToken('token-renew')).json();
                    if (Object.keys(resp).length>0) {
                        const { user }=resp;
                        dispatch(login({
                            uid: user._id,
                            firstNames: user.firstNames,
                            lastName: user.lastName,
                            email: user.email,
                            phonenumber: user.phonenumber,
                            portraitUrl: user.portrait_url,
                            country: user.country,
                            city: user.city,
                            groups:user.groups,
                            isCheking:true
                        }))
                        
                    }
                } catch (error) {
                    dispatch(checkingStart())
                    console.log('error')
                }
        }else{
            console.log('no token')
            dispatch(checkingStart())
        }
    }
}
export const checkingStart = () => ({ type: types.authChecking })

export const checkingFinish = () => ({ type: types.authCheckingFinish })

export const logout = () => ({ type: types.authChecking });

const login = (user) => ({
    type: types.authLogin,
    payload: user
})
