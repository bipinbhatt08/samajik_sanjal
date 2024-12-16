'use client'
import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const page = () => {
    
    const SignupSchema = Yup.object().shape({
        username: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required('Username is required'),
        password: Yup.string()
          .required('Password is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: SignupSchema,
        onSubmit: values => {
            handleRegister(values);
            console.log("DATA", values);
        },
    });

    const handleRegister = async (values) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/register`, values, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = res.data;
        if (res.status !== 200) {
            return toast.warning(data.message)
        }
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
                                    <h1 className="text-2xl font-bold">Create a new account</h1>
                                    <p>It's quick and easy.</p>
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
                                    label="Username"
                                    type="text"
                                    name='username'
                                    variant="bordered"
                                    size='sm'
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    isInvalid={formik.touched.username && formik.errors.username}
                                    errorMessage={formik.errors.username}
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
                                <Input
                                    className="w-10/12 my-1 bg-white"
                                    label="Confirm Password"
                                    type="password"
                                    variant="bordered"
                                    size='sm'
                                    name='confirmPassword'
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                    errorMessage={formik.errors.confirmPassword}
                                />

                                <Button color='primary' type='submit' className='w-10/12 my-2 font-bold text-xl' size='lg' radius='sm'>
                                    Create Account
                                </Button>
                                <Link href="/home">Already have an account?</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page;
