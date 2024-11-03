"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import InputField from "../../../_components/InputField";
import { signUp } from "@/app/_actions/User/user";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const RegisterPage = () => {
  const t = useTranslations('auth');
  const router = useRouter();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required(t('first-name-is-required')),
    lastName: Yup.string().required(t('last-name-is-required')),
    email: Yup.string()
      .email(t('invalid-email-address'))
      .required(t('email-is-required'))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        t('invalid-email-address-pattern')
      ),
    password: Yup.string()
      .min(6, t('password-must-be-at-least-6-characters'))
      .required(t('password-is-required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('passwords-must-match'))
      .required(t('confirm-password-is-required')),
  });

  const onSubmit = async (values) => {
    try{
      await signUp(values);
      router.push("/"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
            <div className=" min-h-screen flex items-center justify-center">
            <div className="bg-white border rounded-2xl w-full max-w-lg p-6 shadow-lg">
              <h1 className="text-xl text-center text-gray-900 p-3">
                {t('create-a-new-account')}
              </h1>
              <hr className="border-neutral-300 mb-4" />
              <p className="text-lg text-gray-900 font-semibold mb-4">
                {t('welcome-to-airbnb')}
              </p>
        
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-5">
          <InputField
              id="firstName"
              name="firstName"
              type="text"
              label={t('first-name')}
              icon={MdPerson}
            />
            <InputField
              id="lastName"
              name="lastName"
              type="text"
              label={t('last-name')}
              icon={MdPerson}
            />
            <InputField
              id="email"
              name="email"
              type="email"
              label={t('email')}
              icon={MdEmail}
            />
            <InputField
              id="password"
              name="password"
              type="password"
              label={t('password')}
              icon={RiLockPasswordLine}
            />
            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label={t('confirm-password')}
              icon={RiLockPasswordLine}
            />
            <p className="text-sm text-red-600 mb-4">
              {touched.firstName && errors.firstName ? errors.firstName :
                touched.lastName && errors.lastName ? errors.lastName :
                  touched.email && errors.email ? errors.email :
                    touched.password && errors.password ? errors.password :
                      touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {t('we-ll-email-you-to-confirm-your-email-address')}. {t('standard-message-and-data-rates-apply')}{" "}
              <Link href="#" className="underline">
                {t('privacy-policy')}
              </Link>
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#D70466] text-white rounded-lg hover:bg-[#e1227b] transition duration-300 font-semibold disabled:opacity-50"
            >
              {isSubmitting ? t('creating-account') : t('create-account')}
            </button>
            <p className="text-sm text-center mt-4">
              {t('already-have-an-account')}{" "}
              <Link
                href="/auth/login"
                className="text-[#D70466] hover:underline"
              >
                {t('login')}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
      
    </div>
    </div>
  );
};

export default RegisterPage;