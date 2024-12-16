'use client'
import { Button,Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation';


const page = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const ForgetPasswordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: ForgetPasswordSchema,
        onSubmit: values => {
            handleForgetPassword(values);
        },
    });

    const handleForgetPassword = async (values) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/forgetPassword`, values, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = res.data;
        if (res.status !== 200) {
            return toast.warning(data.message)
        }
        router.push(`/verifyOTP?email=${encodeURIComponent(values.email)}`) //queries yesari rakhne ok sir

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
                                    <p>Enter your email to get OTO</p>
                                </div>

                                <Input
                                    className="w-10/12 my-1 bg-white"
                                    label="Email"
                                    type="email"
                                    variant="bordered"
                                    size='sm'
                                    name='email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    isInvalid={formik.touched.email && formik.errors.email}
                                    errorMessage={formik.errors.email}
                                />

                              
                                <Button color='primary' type='submit' className='w-10/12 my-2 font-bold text-xl' size='lg' radius='sm'>
                                    Get OTP
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
