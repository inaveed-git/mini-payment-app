import { atom } from "recoil";


export interface Iuser {
     firstName: string;
    lastName: string ; 
    userName: string ; 
    email: string ; 
}

export interface IauthState {
    user: Iuser | null;
    isLoading: boolean ; 
}



export const userState = atom<IauthState> ({
    key: "userState" , 
    default: { 
        user: null , 
        isLoading: true
    }
})



