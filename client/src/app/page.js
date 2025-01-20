'use client'
import { useSelector } from 'react-redux';
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Post from '@/components/Post'
export default function Home() {



  const user = useSelector((state)=>state.user)
  console.log("USERGJLKJS",user)
  const [profile,setProfile]=useState('')


  
  const fetchProfile = async()=>{
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URI}/profile`,{
       headers:{
         Authorization: `Bearer ${user.token}`,
       }
      })
 
      setProfile(res.data.data)
     
    } catch (error) {
       if (error.response) {
             toast.error(error.response.data.message || "An error occurred")
           } else if (error.request) {
             toast.error("No response from the server")
           } else {
            console.log(error)
             toast.error("Something went wrong")
           }
    }
 }
 useEffect(()=>{
  fetchProfile()
 },[])
  return (
    <>
    <Navbar user={user} profile={profile}></Navbar>
    </>
  );
}
