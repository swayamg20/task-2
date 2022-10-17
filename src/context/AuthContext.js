import React, { useContext, useState, useEffect } from "react"
import { FirebaseApp } from "../firebase"
import {getAuth,createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,signOut,
        sendPasswordResetEmail, onAuthStateChanged,sendEmailVerification} from "firebase/auth"
const AuthContext = React.createContext()
const auth = getAuth(FirebaseApp());
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout() {
    return signOut(auth)
  }
  function emailVerification(){
    return sendEmailVerification(currentUser);
  };

  function resetPassword(email) {
    return sendPasswordResetEmail(auth,email)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    emailVerification
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}