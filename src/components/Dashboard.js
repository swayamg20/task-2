import axios from "axios"
import React,{useEffect,useState} from "react"
import { Card,Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Error from "./Error"
import App from './App'
export default function Dashboard() {
  const navigate = useNavigate()
  const {currentUser, logout} = useAuth()
  function handleLogout(){
    logout()
    navigate("/login")
  }
  // console.log(currentUser.photoURL)
  const [user,setUser] = useState()
  const [error,setError] = useState("")
  useEffect(()=>{
    axios.post('http://localhost:60002/api/get-user-by-id',{email:currentUser.email}).then((response)=>{
      console.log(response)    
      setUser(response.data[0])
      }).catch((err)=>{
          console.log(err);
          setError("Error in fetching data..")
      });
  },[currentUser])
  // console.log(user)

  return (
    error? <Error message={error} solution='Please make sure you are connected to Internet.'/>:(
    user===undefined?<p>Loading....</p> : 
   
      <Card>
       {/* <App /> */}
        <strong>FirebaseUID : </strong>  {user.firebaseuid} 
        <strong>Name : </strong>  {user.name} <br/>
        <strong>Parent Name: </strong>  {user.parentName} <br/>
        <strong>Gender: </strong>  {user.gender} <br/>
        <strong>Pool : </strong>  {user.pool} <br/>
        <strong>Grade : </strong>  {user.grade} <br/>
        <strong>Email : </strong>  {user.email} <br/>
        <strong>Phone : </strong>  {user.phone} <br/>
        <strong>WhatsApp : </strong>  {user.WhatsApp} <br/>
        <strong>DOB : </strong>  {user.dob} <br/>
        <strong>School Name : </strong>  {user.schoolName} <br/>
        <strong>School Address : </strong>  {user.schoolAddress} <br/>
        <strong>School City: </strong>  {user.schoolCity} <br/>
        <strong>Photo URL : </strong>  {currentUser.photoURL} <br/>
        <strong>Email Verified : </strong>  {currentUser.emailVerified?"Yes":"No"} <br/>
        <strong>Payment Done: </strong>  {user.isPayment?"Yes":"No"} <br/>
        <Button onClick={handleLogout}> Logout</Button>
      </Card>
    )
  )
}
