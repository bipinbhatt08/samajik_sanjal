'use client'
import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addUserDetail } from '@/redux/reducers/userSlice'

const page = () => {
    const dispatch = useDispatch()

    const LoginSchema = Yup.object().shape({
        password: Yup.string()
          .required('Password is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: values => {
            handleLogin(values);
        },
    });

    const handleLogin = async (values) => {
        const res = await axios.post('http://localhost:5001/login', values, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = res.data;
        if (res.status !== 200) {
            return toast.warning(data.message)
        }
        dispatch(addUserDetail(data))
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
                                    <h1 className="text-2xl font-bold">Login </h1>
                                    <p>Enter your credentials.</p>
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

                                <Input
                                    className="w-10/12 my-1 bg-white"
                                    label="Password"
                                    type="password"
                                    variant="bordered"
                                    size='sm'
                                    name='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    isInvalid={formik.touched.password && formik.errors.password}
                                    errorMessage={formik.errors.password}
                                />

                                <Button color='primary' type='submit' className='w-10/12 my-2 font-bold text-xl' size='lg' radius='sm'>
                                    Login
                                </Button>
                                <Link href="/register">Don't have account?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page;
