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
} from "../../../../components/ui/dialog";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import SocialLoginButton from "./SocialLoginButton";
import InputField from "../../InputField";

const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address pattern"
      ),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
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
            Login
          </button>
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-2xl w-full max-w-2xl p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl  text-center text-gray-900 p-3">
              Log in 
            </DialogTitle>
            <hr className="border-neutral-300" />
          </DialogHeader>
          <p className=" text-lg text-gray-900 font-semibold">
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
                <p className="text-sm text-red-600 mb-4">
                  {touched.email && errors.email ? errors.email : touched.password && errors.password ? errors.password : null}
                </p>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D70466] text-white rounded-lg hover:bg-[#e1227b] transition duration-300 font-semibold"
                >
                  Continue
                </button>
                <p className="text-sm text-center mt-4">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-[#D70466] hover:underline"
                >
                  Register now
                </Link>
              </p>
              </Form>
            )}
          </Formik>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="space-y-2">
            <SocialLoginButton
              provider="facebook"
              text="Continue with Facebook"
            />
            <SocialLoginButton
              provider="google"
              text="Continue with Google"
            />
            <SocialLoginButton
              provider="apple"
              text="Continue with Apple"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;
