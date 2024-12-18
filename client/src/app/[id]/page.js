'use client'
import styles from './profile.module.css';
import { FaLocationDot,FaEnvelope,FaPhoneVolume, FaCalendarDay } from "react-icons/fa6";

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarGroup, Button, ButtonGroup } from '@nextui-org/react';
import Post from '@/components/Post';

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
    
        <main className={`${styles.ok} container mx-auto  `}>
          <section className=''>
            <div className={` ${styles.coverpicContainer}   flex items-center justify-center h-[20vh] lg:h-[30vh] xl-h[35vh]`}>
            <img
              className='w-full h-full object-cover rounded-b-md '
              alt="Cover Pic"
              src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${profile?.coverPic}`}
            />
            </div>
            <div className="profileAndNameContainer  flex justify-start items-center gap-4  mx-2  -mt-5">
              <div className={`${styles.profilePicContainer}    w-[100px] h-[100px] flex justify-center items-center`}>
               <Avatar isBordered color="danger" className={` ${styles.profilePic} text-large `} src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${profile?.profilePic}`} />
              </div>
              <div className="nameContainer flex items-center justify-between   w-full">
                <div className='w-4/12 '>
                  <h1 className='text-2xl font-bold'>{profile?.user?.username}</h1>
                  <p>4.1K Friends</p>
                </div>
                
                <div className="buttons w-full flex  justify-end  gap-5 ">
                  <Button className='border' color='primary' radius='sm'>Add friend</Button>
                  <Button className='border' radius='sm'>Message</Button>
                </div>
              </div>
            </div>

          </section>
          <section className="bioAndOthers px-2 py-5 ">
            <div className="bio mb-5">
            <p className='text-lg'>{profile?.bio}</p>
            </div>
            <hr />
            <div className="information pt-3 flex flex-col justify-center gap-1 text-gray-800 ">
              <div className="flex justify-start items-center "><p className='text-xl  mr-1'><FaLocationDot/></p>  Lives in &nbsp;<b>{profile?.address}</b></div>
              <div className="flex justify-start items-center "><p className='text-xl  mr-1'><FaPhoneVolume/></p>  Contact no. &nbsp;<b>{profile?.phoneNumber}</b></div>
              <div className="flex justify-start items-center "><p className='text-xl  mr-1'><FaEnvelope/></p>  Email&nbsp; <b>{profile?.user?.email}</b></div>
              <div className="flex justify-start items-center "><p className='text-xl  mr-1'><FaCalendarDay/></p>  Born on&nbsp; <b>{profile?.dateOfBirth}</b></div>
            </div>
          </section>

          {/* POSTS GOES FORM HERE */}
          <section className="posts  ">
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
            <Post/>
          </section>
        </main>

       
    </div>
  )
}

export default page
