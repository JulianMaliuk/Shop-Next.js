import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken';
import moment from 'moment'
import { useRouter } from 'next/router'

const isAuth = () => {
  const token = localStorage.getItem('access_token')
  if (!token) return false
  const decoded = jwt.decode(token)
  if (!decoded) return false
  const isAuth = (!decoded.exp || moment().format('X') > decoded.exp) ? false : true
  return isAuth
}

const PrivateRoute = ({ children }) => {
  const [isCheck, setIsCheck] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if(!isAuth()) {
      return router.push('/admin/auth')
    } 
    setIsCheck(true)
  }, []);

  return (
    isCheck
      ? children
      : <h1>Loading...</h1>
)}

export default PrivateRoute