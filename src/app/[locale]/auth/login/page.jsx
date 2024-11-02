"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import toast, { Toaster } from 'react-hot-toast';
import { signIn } from "next-auth/react";
import { Link, useRouter } from "@/i18n/routing";
import SocialLoginButton from "@/app/_components/Modal/User/SocialLoginButton";
import InputField from "@/app/_components/InputField";
import { useTranslations, useLocale } from "next-intl";


const LoginPage = () => {
  const router = useRouter();
  const t = useTranslations('auth');
  const locale = useLocale();
  const initialValues = {
    email: "",
    password: "",
  };
  
  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t('invalid-email-address'))
      .required(t('email-is-required'))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        t('invalid-email-address-pattern')
      ),
    password: Yup.string()
      .min(4, t('password-must-be-at-least-4-characters'))
      .required(t('password-is-required')),
  });

  
  const onSubmit = async (values, { setSubmitting }) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setSubmitting(false);

    if (result.ok) {
      router.push('/');
      toast.success(t('login-successful'));
    } else {
      toast.error(t('login-failed'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-white border rounded-2xl w-full max-w-lg p-6 shadow-lg">
        <h1 className="text-xl text-center text-gray-900 p-3">{t('login')}</h1>
        <hr className="border-neutral-300 mb-4" />
        <p className="text-lg text-gray-900 font-semibold mb-4">
          {t('welcome-to-airbnb')}
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
                label={t('email')}
                icon={MdEmail}
              />
              <p className="text-sm text-red-600 mb-1">
                {touched.email && errors.email}
              </p>
              <InputField
                id="password"
                name="password"
                type="password"
                label={t('password')}
                icon={RiLockPasswordLine}
              />
              <p className="text-sm text-red-600 mb-1">
                {touched.password && errors.password}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {t('confirm-your-email')}{" "}
                <Link href="#" className="underline">
                  {t('privacy-policy')}
                </Link>
              </p>
              <button
                type="submit"
                className="w-full py-3 bg-[#D70466] text-white rounded-lg hover:bg-[#e1227b] transition duration-300 font-semibold"
              >
                {t('login')}
              </button>
              <p className="text-sm text-center mt-4">
                {t('dont-have-an-account')}{" "}
                <Link
                  href="/auth/register"
                  className="text-[#D70466] hover:underline"
                >
                  {t('register-now')}
                </Link>
              </p>
            </Form>
          )}
        </Formik>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">{t('or')}</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className="space-y-2">
          <SocialLoginButton provider="facebook" text={t('continue-with-facebook')} />
          <SocialLoginButton provider="google" text={t('continue-with-google')} />
          <SocialLoginButton provider="apple" text={t('continue-with-apple')} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;