import axios from 'axios'
import React,{useState,useRef} from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function FormSeller() {
    const navigate = useNavigate()
    const [loading,setLoading] = useState()
    const {currentUser} = useAuth()
    const nameRef = useRef()
    const emailRef = useRef()
    const goalRef = useRef()
    
    
    async function handleSubmit(e){
        setLoading(true)
        e.preventDefault()
       
        const userDetails = {
            firebaseuid : currentUser.uid,
            name : nameRef.current.value,
            email : emailRef.current.value,
            isDetails : true
            
        }
        axios.post('http://localhost:60002/api/update-seller-details',userDetails).then((response)=>{
            console.log(response)
            setLoading(false)
            alert("Details Updated Successfully.")
            window.location.reload()
             navigate("/dashboard")

        }).catch((error)=>{
            console.log(error)
            setLoading(false)
            alert("Error in submitting the details. Please make sure you are connected to internet.")
        })
        console.log(userDetails)
    }
  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Seller Registration </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name" className="py-2">
              <Form.Label>Seller Name*</Form.Label>
              <Form.Control type="text" ref={nameRef} placeholder="Your Name Here"   required/>
            </Form.Group>
            <Form.Group id="email" className="py-2">
              <Form.Label>Seller Email</Form.Label>
              <Form.Control type="email" ref={emailRef} disabled value={currentUser.email}  required />
            </Form.Group>
            <Form.Group id="name" className="py-2">
              <Form.Label>Enter your goal to earn </Form.Label>
              <Form.Control type="text" ref={goalRef} placeholder="Your Goal"   required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {/* Already have an account? <Link to="/login">Log In</Link> */}
      </div>
    </>
  )
}
