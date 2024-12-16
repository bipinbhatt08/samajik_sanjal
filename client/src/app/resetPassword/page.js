'use client'
import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSearchParams,useRouter } from 'next/navigation'

const page = () => {
    

    const router = useRouter()
    const searchParams = useSearchParams();
    const email = searchParams.get('email'); 
    const ResetPasword = Yup.object().shape({
        newPassword: Yup.string()
        .required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
    });

    const formik = useFormik({
        initialValues: {
          newPassword: '',
            confirmPassword: ''
        },
        validationSchema: ResetPasword,
        onSubmit: values => {
            resetPassword(values,email);
        },
    });

    const resetPassword = async (values) => {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URI}/resetPassword`, {...values,email}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = res.data;
        if (res.status !== 200) {
            return toast.warning(data.message)
        }
        toast.success(data.message)
        router.push('/login')
    }

    return (
        <>
            <section className='loginForm bg-gray-100'>
                <div className="container mx-auto">
                    <div className='flex flex-wrap items-center justify-center my-5 min-h-screen'>
                        <div className="w-6/12">
                            <form onSubmit={formik.handleSubmit} className='rounded-md flex flex-wrap items-center justify-center py-5 bg-white'>
                                <div className="mb-3 text-center">
                                    <h1 className="text-2xl font-bold">Reset you password</h1>
                                    <p>It's quick and easy.</p>
                                </div>
                                <Input
                                    className="w-10/12 my-1 bg-white"
                                    label="New password"
                                    type="password"
                                    variant="bordered"
                                    size='sm'
                                    name='newPassword'
                                    onChange={formik.handleChange}
                                    value={formik.values.newPassword}
                                    isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                                    errorMessage={formik.errors.newPassword}
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
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default page;
