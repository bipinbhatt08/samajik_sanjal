'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
const params = useParams()
const [profile,setProfile]=useState({})

useEffect(()=>{
     fetchProfile()
},[])
const fetchProfile = async()=>{
    const res = await axios.get(`http://localhost:5001/profile/${params.id}`)
    
    setProfile(res.data.data)
    
}
const { user } = profile || {}; // Destructure user safely
return ( 
    <div>
        {
            JSON.stringify(profile)
        }
       <div>User name is : {user?.username } </div>
       <div>Address: {profile?.address}</div>
       <div>Address: {profile?.address}</div>
         Profile PIc <img src={`http://localhost:5001/uploads/${profile?.profilePic}`} alt="mo img" width='100' />
       <div></div>
       COver Pic <img src={`http://localhost:5001/uploads/${profile?.coverPic}`} alt="mo img" width='100' />
       <div></div>
       <div></div>
    </div>
  )
}

export default page
