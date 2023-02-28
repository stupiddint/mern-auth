import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// custom hook
export default function useFetch(query){
    const [getData, setData] = useState({isLoading: false, apiData: undefined, status: null , serverError: null})
    console.log(`query ${query}`)
    useEffect(()=>{
        console.log('useEffect')
        
        const fetchData = async () =>{
            try {
                console.log('try block')
                setData(prev => ({...prev, isLoading:true}))
                const {username} = !query ? await getUsername() : '';

                const {data, status} = !query ? await axios.get(`/api/${username}`) : await axios.get(`/api/{${query}}`) 
                if(status === 201){
                    console.log(`status ${status}`)
                    setData(prev => ({...prev, isLoading:false, apiData: data, status:status}))
                    setData(prev => ({...prev, apiData: data, status:status}))
                    
                }
                console.log('outside')
                setData(prev => ({...prev, isLoading:false}))
                
            } catch (error) {
                console.log(`error ${error}`)
                setData(prev => ({...prev, isLoading:false, serverError: error }))
            }
        }
    },query);
    console.log(`getData ${getData}, setData ${setData}`)
    return [getData, setData];
}