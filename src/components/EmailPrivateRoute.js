import React,{useEffect,useState} from 'react'
import {useAuth} from '../context/AuthContext';
import axios from 'axios'
import Error from './Error'
import EmailVerification from './EmailVerification';
import FormBuyer from './FormBuyer'
import Dashboard from './Dashboard';
import FormSeller from './FormSeller';

export default function PrivateRoute({children}) {
    const {currentUser} = useAuth();
    console.log(currentUser)
    const [data,setData] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(true);
    const [solution,setSolution] = useState("");
    let dataAll=[];
    // console.log(currentUser)
    useEffect(()=>{
        if(currentUser!==null){
            // setSome(currentUser.email)
            axios.post('http://localhost:60002/api/get-user-by-id',{email: currentUser.email}).then((response)=>{
            //console.log(response.data[0].role)   
            
            setData(response)
            // console.log(response.data[0])
            dataAll = response.data[0];
            console.log(dataAll.isDetails)
            //console.log(data)
            setLoading(false)
            }).catch((err)=>{
                console.log(err);
                setError(`Error in fetching data.`)
                setSolution('Please make sure you are connected to Internet.')
                setLoading(false)
            });
            // setSome(currentUser.email)
        }
        else{
            setError("User not Found.")
            setSolution(`You are not logged in. Go to login page.`)
            setLoading(false)
        }
    },[currentUser]
    );
    return(
        loading?<p>Loading...</p>:(error? <Error message={error} solution={solution}/>: (currentUser.role==="buyer" ? (dataAll.isDetails ? <Dashboard/>: <FormBuyer />) : (dataAll.isDetails ? <Dashboard/>: <FormSeller />)))
    )
}
