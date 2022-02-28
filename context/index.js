import { useReducer, createContext,  useEffect } from "react";
import axios from "axios";
import {useRouter} from 'next/router'

const initialState = {
    user: null
}

const Context = createContext()

const rootReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {...state, user: action.payload};
        case "LOGOUT":
            return {...state, user: null};
            case "SET-PLAYLIST": 
            return {...state, playlist: action.payload}
        case "REMOVE-PLAYLIST": 
            return {...state, playlist: null}    
        default: return state
    }
}

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(rootReducer, initialState)

    const router = useRouter()

    axios.interceptors.response.use(
        function (response) {
          return response;
        },
        function (error) {
          let res = error.response;
          if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
            return new Promise((resolve, reject) => {
              axios
                .get("/api/logout")
                .then((data) => {
                  console.log("/401 error > logout");
                  dispatch({ type: "LOGOUT" });
                  window.localStorage.removeItem("user");
                  router.push("/login");
                })
                .catch((err) => {
                  console.log("axios. interceptors err", err);
                  reject(error);
                });
            });
          }
    
          
          return Promise.reject(error);
        }
        );

    useEffect(()=> {
     const user = window.localStorage.getItem('user')
     if(user) {
         dispatch({
             type:"LOGIN", 
             payload: JSON.parse(localStorage.getItem('user'))
         })
     }
    },[])

    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}

export {Context, Provider}