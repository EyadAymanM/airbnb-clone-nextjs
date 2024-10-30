"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";
import InputField from "../../_components/InputField";
import SocialLoginButton from "../../_components/Modal/User/SocialLoginButton";
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from "next-auth/react";

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

const LoginPage = () => {
  const router = useRouter();
  
  const onSubmit = async (values, { setSubmitting }) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setSubmitting(false);

    if (result.ok) {
      router.push('/');
      toast.success("Login successful!");
    } else {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white border rounded-2xl w-full max-w-xl p-6 shadow-lg">
        <h1 className="text-xl text-center text-gray-900 p-3">Log in</h1>
        <hr className="border-neutral-300 mb-4" />
        <p className="text-lg text-gray-900 font-semibold mb-4">
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
              <p className="text-sm text-red-600 mb-1">
                {touched.email && errors.email}
              </p>
              <InputField
                id="password"
                name="password"
                type="password"
                label="Password"
                icon={RiLockPasswordLine}
              />
              <p className="text-sm text-red-600 mb-1">
                {touched.password && errors.password}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                We&apos;ll email you to confirm your email address. Standard
                message and data rates apply.{" "}
                <Link href="#" className="underline">
                  Privacy Policy
                </Link>
              </p>
              <button
                type="submit"
                className="w-full py-3 bg-[#D70466] text-white rounded-lg hover:bg-[#e1227b] transition duration-300 font-semibold"
              >
                Login
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
          <SocialLoginButton provider="facebook" text="Continue with Facebook" />
          <SocialLoginButton provider="google" text="Continue with Google" />
          <SocialLoginButton provider="apple" text="Continue with Apple" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;