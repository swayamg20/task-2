import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, Navigate} from "react-router-dom"
import axios from "axios"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [role,setRole] = useState()
  const [loading, setLoading] = useState(false)
  function handleSubmit(e) {
    e.preventDefault()
    if(passwordRef.current.value.length < 6){
        return setError("Password too short, atleast 6 characters are required.")
    }
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
      setError("")
      setLoading(true)
      signup(emailRef.current.value, passwordRef.current.value).then((response)=>{
        axios.post("http://localhost:60002/api/post-data",{
          email: emailRef.current.value,
          password: passwordRef.current.value,
          role: role
      }).then((response)=>{
            console.log(response)
            console.log(role)
            setMessage("True")
        })
      }) 
    

    setLoading(false)
  }
  function onChangeRole(e){
    setRole(e.target.value)
}

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success"> Successfully signed up. Go to {<Link to="/login">login</Link>} page.</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Check type='radio' checked={role==="buyer"} onChange={onChangeRole} value="buyer" id="role"  name="role" label="buyer" inline required/>
            <Form.Check type='radio' checked={role==="seller"} onChange={onChangeRole} value="seller"  name="role" label="seller" inline/>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
