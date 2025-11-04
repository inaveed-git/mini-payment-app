
import React, { useEffect } from 'react'
import axios from "axios"
import { useSetRecoilState } from 'recoil'
import { userState } from '../recoil/authAtom'
const useLoadUser = () => {

    const setAuthState = useSetRecoilState(userState);


useEffect(() => { 
const loadUser = async() => { 
    try {
           const response =    await axios.get(
                                `${import.meta.env.VITE_API_URL}/api/user/auth/me`, {withCredentials: true}

           )

setAuthState({
    user: response.data.user , 
    isLoading: false
})
    } catch (error) {
        alert(error);

    }
}
loadUser()

} , [setAuthState])

}

export default useLoadUser