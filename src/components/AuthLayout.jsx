import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Protected ({ children, authentication= true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect (() => {
    //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false


    if(authentication && authStatus !== authentication){
      navigate("/Blog-app/login")
       
    }else if (!authentication && authStatus !== authentication){
      navigate("/Blog-app/")
    }

    setLoader(false)

  },[ navigate, authStatus, authentication])
  return  loader ?<h1>loading...</h1> : <>{children}</>
}


