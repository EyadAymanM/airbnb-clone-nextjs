"use client";

import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "@/i18n/routing";
import InputField from "../../InputField";

const SignUpModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const initialValues = {
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    fName: Yup.string().required("First Name is required"),
    lName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address pattern"
      ),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <button
            onClick={toggleModal}
            className="px-4 py-2 rounded-lg font-semibold"
          >
            Sign Up
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-2xl w-full max-w-2xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-center text-gray-900 p-3">
              Create a new account
            </DialogTitle>
            <hr className="border-neutral-300" />
          </DialogHeader>
          <p className="text-lg text-gray-900 font-semibold">
            Welcome to Airbnb
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-5">
              <InputField
              id="fName"
              name="fName"
              type="text"
              label="First Name"
              icon={MdPerson}
            />
            <InputField
              id="lName"
              name="lName"
              type="text"
              label="Last Name"
              icon={MdPerson}
            />
                <InputField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  icon={MdEmail}
                />
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  icon={RiLockPasswordLine}
                />
                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  icon={RiLockPasswordLine}
                />
                <p className="text-sm text-red-600 mb-4">
                  {touched.name && errors.name ? errors.name :
                   touched.email && errors.email ? errors.email :
                   touched.password && errors.password ? errors.password :
                   touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  We&#39;ll email you to confirm your email address. Standard message and data rates apply.{" "}
                  <Link href="#" className="underline">
                    Privacy Policy
                  </Link>
                </p>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D70466] text-white rounded-lg hover:bg-[#e1227b] transition duration-300 font-semibold"
                >
                  Create Account
                </button>
                <p className="text-sm text-center mt-4">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-[#D70466] hover:underline"
                  >
                    Log in
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
          
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpModal;