'use client'
import { Button,form,Input, InputOtp } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'


const page = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const email = searchParams.get('email'); // Extract email from URL query
    const OtpSchema = Yup.object().shape({
        otp: Yup.string()//0123 will be 123 if i use number here
        .required('Otp is required')
        .matches(/^\d{4}$/, "OTP must be a 4-digit number")

    });

    const formik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: OtpSchema,
        onSubmit: values => {
            handleForgetPassword(values,email);
        },
    });

    const handleForgetPassword = async (values,email) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/verifyOtp`, {...values,email}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = res.data;
        if (res.status !== 200) {
            return toast.warning(data.message)
        }
        router.push(`/resetPassword?email=${encodeURIComponent(email)}`) //queries yesari rakhne ok sir

        toast.success(data.message)
    }

    return (
        <>
            <section className='loginForm bg-gray-100'>
                <div className="container mx-auto">
                    <div className='flex flex-wrap items-center justify-center my-5 min-h-screen'>
                        <div className="w-6/12">
                            <form onSubmit={formik.handleSubmit} className='rounded-md flex flex-wrap items-center justify-center py-5 bg-white'>
                                <div className="mb-3 text-center">
                                    <h1 className="text-2xl font-bold">Samajik Sanjal </h1>
                                    <p>Verify your OTP</p>
                                </div>

                               
                                <InputOtp 
                                name='otp' 
                                type='text'
                                length={4}  
                                variant='bordered' 
                                className='w-10/12 text-center' 
                                onChange={formik.handleChange}
                                value={formik.values.otp} 
                                isInvalid={formik.errors.otp?true:false} 
                                errorMessage={formik.errors.otp}/>


    
                                <Button color='primary' type='submit' className='w-10/12 my-2 font-bold text-xl' size='lg' radius='sm'>
                                    Verify
                                </Button>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page;
