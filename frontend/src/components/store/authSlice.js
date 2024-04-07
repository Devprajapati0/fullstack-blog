import { createSlice } from "@reduxjs/toolkit";


export const useSlice = createSlice({
    name:"auth",
    initialState:{
        status:false,
        useAuth:{
            accessToken:"",
            refreshToken:""
        }
    },
    reducers:{
        login: (state,actions)=> {
            state.status = true;
            state.useAuth = actions.payload

        },
        logout: (state) => {
            state.status = false
            state.useAuth = {
                accessToken:"",
                refreshToken:""
            }
        }
    }

})

export const {login,logout} = useSlice.actions;
export default useSlice.reducer;

