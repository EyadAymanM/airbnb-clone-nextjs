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
import { Link } from "@/i18n/routing";
import SocialLoginButton from "./SocialLoginButton";
import InputField from "../../InputField";
import IconButton from "../../IconButton";
import { AiFillHeart } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";


const LoginModal = () => {
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations("auth");

  const toggleModal = () => setShowModal(!showModal);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("invalid-email-address"))
      .required(t("email-is-required"))
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        t("invalid-email-address-pattern")
      ),
    password: Yup.string()
      .min(4, t("password-must-be-at-least-4-characters"))
      .required(t("password-is-required")),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    setSubmitting(false);
    if (result.ok) {
      toast.success(t("login-successful"));
    } else {
      toast.error(t("login-failed"));
    }
  };

  return (
    <div>
      <Dialog open={showModal} onOpenChange={toggleModal}>
        <DialogTrigger asChild>
          <IconButton
            ariaLabel="Add to Wishlist"
            icon={AiFillHeart}
            onClick={toggleModal}
            classNames={`absolute top-2 text-gray-300 right-3 flex items-center justify-center hover:scale-125`}
          />
        </DialogTrigger>
        <DialogContent className="bg-white border rounded-2xl w-full max-w-lg p-6 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl text-center text-gray-900 p-3">
              {t("login")}
            </DialogTitle>
            <hr className="border-neutral-300" />
          </DialogHeader>
          <p className="text-lg text-gray-900 font-semibold">
            {t("welcome-to-airbnb")}
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
                  label={t("email")}
                  icon={MdEmail}
                />
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  label={t("password")}
                  icon={RiLockPasswordLine}
                />
                <p className="text-sm text-red-600 mb-4">
                  {touched.email && errors.email
                    ? errors.email
                    : touched.password && errors.password
                    ? errors.password
                    : null}
                </p>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D70466] text-white rounded-lg hover:bg-[#e1227b] transition duration-300 font-semibold"
                >
                  {t("login")}
                </button>
                <p className="text-sm text-center mt-4">
                  {t("dont-have-an-account")}{" "}
                  <Link
                    href="/auth/register"
                    className="text-[#D70466] hover:underline"
                  >
                    {t("register-now")}
                  </Link>
                </p>
              </Form>
            )}
          </Formik>
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">{t("or")}</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="space-y-2">
            <SocialLoginButton
              provider="facebook"
              text={t("continue-with-facebook")}
            />
            <SocialLoginButton
              provider="google"
              text={t("continue-with-google")}
            />
            <SocialLoginButton
              provider="apple"
              text={t("continue-with-apple")}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoginModal;