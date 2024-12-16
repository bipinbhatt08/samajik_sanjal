'use client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
const params = useParams()
const [profile,setProfile]=useState({})
const router = useRouter()
useEffect(()=>{
     fetchProfile()
},[])
const fetchProfile = async()=>{
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/profile/${params.id}`)
    
    setProfile(res.data.data)
    if(res.status!==200){
      router.push('/setprofile')
    }
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
         Profile PIc <img src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${profile?.profilePic}`} alt="mo img" width='100' />
       <div></div>
       COver Pic <img src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${profile?.coverPic}`} alt="mo img" width='100' />
       <div></div>
       <div></div>
    </div>
  )
}

export default page
