"use client"
import {
  Button,Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react"
import axios from "axios"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import React from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

const page = () => {
  const router = useRouter()
  const user = useSelector((state) => state.user)
  const ProfileSchema = Yup.object().shape({
    fullname: Yup.string().required("Full name is required"),
    address: Yup.string().required("Address is Required"),
    bio: Yup.string()
      .required("Bio is required")
      .max(500, "Bio cannot exceed 500 characters"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    gender: Yup.string()
      .required("Gender is required")
      .oneOf(["male", "female", "other"], "Invalid gender selection"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
    profilePic: Yup.mixed()
      .nullable()
      .test("fileType", "Only image files are allowed", (value) => {
        return value
          ? ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(
              value.type
            )
          : true
      })
      .test("fileSize", "File size should not exceed 2MB", (value) => {
        return value ? value.size <= 2 * 1024 * 1024 : true // 2MB limit
      }),

    coverPic: Yup.mixed()
      .nullable()
      .test("fileType", "Only image files are allowed", (value) => {
        return value
          ? ["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(
              value.type
            )
          : true
      })
      .test("fileSize", "File size should not exceed 2MB", (value) => {
        return value ? value.size <= 2 * 1024 * 1024 : true // 2MB limit
      }),
  })
  const formik = useFormik({
    initialValues: {
      fullname: "",
      address: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      bio: "",
      coverPic: "",
      profilePic: "",
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      handleCreateProfile(values)
    },
  })
  const handleCreateProfile = async (values) => {
    const formData = new FormData()

    for (let key in values) {
      if (values[key]) {
        formData.append(key, values[key])
      }
    }
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URI}/profile`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (res.status === 200) {
        toast.success(res.data.message)
        router.push(`/profile}`)
      }
    } catch (error) {
      // Centralized Error Handling
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred")
      } else if (error.request) {
        toast.error("No response from the server")
      } else {
        toast.error("Something went wrong")
      }
    }
  }
  return (
    <section className=" bg-gray-100  ">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center  min-h-screen">
          <div className="w-full border ">
            <form
              className="rounded-md flex flex-wrap items-center justify-center p-5 bg-white"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-3 text-center w-full">
                <h1 className="text-2xl font-bold">Samajik Sanjal </h1>
                <p>Create your Samajik Sanjal Profile</p>
              </div>
              <div className="form-rows w-full flex  items-center justify-center my-1 gap-2">
                <div className="w-6/12">
                  <Input
                    isRequired
                    className="w-full bg-white"
                    label="Full Name"
                    type="text"
                    variant="bordered"
                    size="sm"
                    name="fullname"
                    onChange={formik.handleChange}
                    value={formik.values.fullname}
                    isInvalid={
                      formik.touched.fullname && formik.errors.fullname
                    }
                    errorMessage={formik.errors.fullname}
                  />
                </div>
                <div className="w-6/12">
                  <Input
                    isRequired
                    className="w-full bg-white"
                    label="Phone Number"
                    type="number"
                    variant="bordered"
                    size="sm"
                    name="phoneNumber"
                    onChange={formik.handleChange}
                    value={formik.values.phoneNumber}
                    isInvalid={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    errorMessage={formik.errors.phoneNumber}
                  />
                </div>
              </div>
              <div className="form-rows w-full flex  items-center justify-center my-1 gap-2">
                <div className="w-6/12">
                  <Input
                    isRequired
                    className="w-full bg-white"
                    label="Address"
                    type="text"
                    variant="bordered"
                    size="sm"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    isInvalid={formik.touched.address && formik.errors.address}
                    errorMessage={formik.errors.address}
                  />
                </div>
                <div className="flex items-center justify-center w-6/12 gap-2">
                  <div className="w-6/12">
                    <Input
                      isRequired
                      className="w-full bg-white"
                      variant="bordered"
                      type="date"
                      size="sm"
                      name="dateOfBirth"
                      label="Date of birth"
                      onChange={formik.handleChange}
                      value={formik.values.dateOfBirth}
                      isInvalid={
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                      }
                      errorMessage={formik.errors.dateOfBirth}
                    />
                  </div>
                  <div className="w-6/12">
                    <Select
                      isRequired
                      className="w-full bg-white"
                      label="Gender"
                      variant="bordered"
                      size="sm"
                      name="gender"
                      items={["male", "female", "other"]}
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                      isInvalid={formik.touched.gender && formik.errors.gender}
                      errorMessage={formik.errors.gender}
                    >
                      <SelectItem key="male">Male</SelectItem>
                      <SelectItem key="female">Female</SelectItem>
                      <SelectItem key="other">Other</SelectItem>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="form-rows w-full flex  items-center justify-center my-1 gap-2">
                <div className="w-6/12  flex  items-center justify-between  ">
                  <h2 className="w-3/12">Profile Picture:</h2>
                  <div className="w-9/12  ">
                    <Input
                      type="file"
                      name="profilePic"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      className="w-full"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        formik.setFieldValue("profilePic", file)
                      }}
                      isInvalid={
                        formik.touched.profilePic && formik.errors.profilePic
                      }
                      errorMessage={formik.errors.profilePic}
                    />
                  </div>
                </div>
                <div className="w-6/12  flex  items-center justify-between b ">
                  <h2 className="w-3/12">Cover Photo:</h2>
                  <div className="w-9/12 ">
                    <Input
                      type="file"
                      name="coverPic"
                      variant="bordered"
                      size="lg"
                      radius="sm"
                      className="w-full"
                      onChange={(e) => {
                        const file = e.target.files[0]
                        formik.setFieldValue("coverPic", file)
                      }}
                      isInvalid={
                        formik.touched.coverPic && formik.errors.coverPic
                      }
                      errorMessage={formik.errors.coverPic}
                    />
                  </div>
                </div>
              </div>
              <Textarea
                isRequired
                className="w-full my-1 bg-white"
                label="Bio"
                variant="bordered"
                size="sm"
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                isInvalid={formik.touched.bio && formik.errors.bio}
                errorMessage={formik.errors.bio}
              />
              <Button
                color="primary"
                type="submit"
                className="w-full my-2 font-bold text-xl"
                size="lg"
                radius="sm"
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
