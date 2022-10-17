import React from 'react'
import Dashboard from "./Dashboard"
import Login from "./Login"
import {Container} from "react-bootstrap"
import { AuthProvider } from "../context/AuthContext";
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import EmailPrivateRoute from './EmailPrivateRoute'
import Signup from './Signup'
import Error from './Error'
import ForgotPassword from './ForgotPassword';
function App(){ 
  return (
    
      <Container className="d-flex align-items-center justify-content-center"style={{minHeight : "100vh"}}>
        <div className="w-100" style={{maxWidth : '100%'}}>
          <Router>
            <AuthProvider>
            <Routes>
                {/* <Route exact path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/dashboard" element={<EmailPrivateRoute><Dashboard/></EmailPrivateRoute>} />
                <Route exact path="/forgot-password" element ={<ForgotPassword/>} />
                <Route path="*" element={<Error message="No matching Route Present" solution="Check whether the URL is correct or not."/>} />
            </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    

  );
}

export default App;
