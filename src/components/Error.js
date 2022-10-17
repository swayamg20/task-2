import React from 'react'
import { Link } from 'react-router-dom'
export default function Error(props) {
  return (
    <div>
      <h1>404! Not Found</h1>
      <strong>Error Type: </strong> {props.message}<br/>
      <strong>Possible Solution: </strong>{props.solution}<br/>
      <strong>Login Page: </strong><Link to="/login">Click Here</Link>
    </div>
  )
}
