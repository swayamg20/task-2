import React,{useState} from 'react'
import { Card,Button } from 'react-bootstrap'
import {useAuth} from '../context/AuthContext'
import Error from './Error'
export default function EmailVerification() {
    const [loading,setLoading] = useState("")
    const [error, setError] = useState("")
    const {emailVerification} = useAuth()
    async function handleVerify(){
        try{
            setError("")
            await emailVerification()
            setLoading(`Email verification link has been sent to your email.
            Open your email and verify the mail and come back again to this page and refresh to 
            proceed further.`)
        }catch(err){
            console.log(err)
            setError("Error in sending mail. Please check your internet connectivity.")
        }
    }
  return (
    error?<Error message = {error} solution=" Please check your internet connectivity."/>:(
        !loading?<Card>
        <h1>Verify Your Email</h1>
        <Button onClick={handleVerify}> Verify</Button>
    </Card>: <p>{loading}</p>
    )
    
    
  )
}
