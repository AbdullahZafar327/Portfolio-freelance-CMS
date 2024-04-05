"use client"
import React, { useEffect } from 'react'
import {Crisp} from 'crisp-sdk-web'

const CrispChat = () => {

    useEffect(()=>{
        Crisp.configure("5d02c6a5-3c5f-4eb7-8b6e-62941f89f51a")
    },[])

  return null
}

export default CrispChat
