"use client";

import { getUser } from "@/app/[locale]/_actions/User/getUserInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "@/i18n/routing";
import React, { useEffect, useState } from "react";
import { CldUploadButton } from 'next-cloudinary';
import Image from "next/image";
import updateUser from "@/app/[locale]/_actions/User/updateUser"
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import UnauthenticatedComponent from "../../_components/UnauthenticatedComponent.jsx/UnauthenticatedComponent";

export default function Page() {
  const t = useTranslations("user-info")
  const router = useRouter();
  const { data: session, status } = useSession();

  const [nameForm, setNameForm] = useState(false);
  const toggleNameForm = () => {
    setNameForm(!nameForm);
    setEmailForm(false);
    setAddressForm(false);
    setImageForm(false)
  };
  const [imageForm, setImageForm] = useState(false);
  const toggleImageForm = () => {
    setImageForm(!imageForm);
    setNameForm(false);
    setEmailForm(false);
    setAddressForm(false);
  };
  const [emailForm, setEmailForm] = useState(false);
  const toggleEmailForm = () => {
    setEmailForm(!emailForm);
    setNameForm(false);
    setAddressForm(false);
    setImageForm(false)
  };
  const [addressForm, setAddressForm] = useState(false);
  const toggleAddressForm = () => {
    setAddressForm(!addressForm);
    setNameForm(false);
    setEmailForm(false);
    setImageForm(false)
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    country: "",
    zip: "",
  });

  const changeName = async() => {
    const user = await updateUser({firstName , lastName},session.user.token.access_token)
    if(user.firstName){
      toast(t("success"))
      setNameForm(false)
    }else{
      toast.error(t("fail"))
    }
  };
  const changeEmail = async() => {
    const user = await updateUser({ email }, session.user.token.access_token)
    if (user.email) {
      toast(t("success"))
      setEmailForm(false)
    } else {
      toast.error(t("fail"))
    }
  };
  const changeAddress = async () => {
    const user = await updateUser({ address }, session.user.token.access_token)
    if (user.address) {
      toast(t("success"))
      setAddressForm(false)
    } else {
      toast.error(t("fail"))
    }
  };
  const handleUpload = (result)=>{
    if (result.event === 'success') {
      setImage(result.info.secure_url)
    }
  }
  const changeImage = async() => {
    const user = await updateUser({ image }, session.user.token.access_token)
    if (user.image) {
      toast(t("success"))
      setImageForm(false)
    } else {
      toast.error(t("fail"))
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (status == "authenticated") {
        const user = await getUser(session.user.token.access_token);

        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setAddress(user.address);
        setImage(user.image)
      }
    };
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  if (status == "loading") {
    return (
      <div role="status" className="h-96 flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff385c]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    );
  }
  if (status == "unauthenticated") {
    return <UnauthenticatedComponent />
  }
  if (status == "authenticated")
  return (
    <>
      <div className="container mx-auto px-20">
        <h1 className="mb-20 mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {t("info")}
        </h1>

        <div className="flex justify-between mb-20 ">
          <div className="w-full">
            <form className="w-full max-w-lg">
              <label>{t("name")}</label>
              <div className="flex  items-center border-b border-grye-500  mb-10">
                <input
                  disabled
                  className={`${
                    nameForm ? "opacity-0" : ""
                  } appearance-none bg-transparent border-none w-screen text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                  type="text"
                  placeholder={`${firstName} ${lastName}`}
                  aria-label="Full name"
                />
                <button
                  onClick={toggleNameForm}
                  className="flex-shrink-0 border-transparent border-4 text-grey-500 hover:text-grey-800 text-simibold text-sm py-1 px-2 rounded underline"
                  type="button"
                >
                  {nameForm ? <>{t("cancel")}</> : <>{t("edit")}</>}
                </button>
              </div>
              <div
                className={`${
                  nameForm ? "" : "hidden"
                } w-full max-w-md mx-auto mb-8`}
              >
                <h2 className="text-lg font-semibold mb-4">
                  {t("name-desc")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("fname")}
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("lname")}
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div
                  onClick={changeName}
                  className="cursor-pointer mt-6 w-fit bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {t("save")}
                </div>
              </div>




              <label>{t("picture")}</label>
              <div className="flex  items-center border-b border-grye-500  mb-10">
                <input
                  disabled
                  className={`${imageForm ? "opacity-0" : ""
                    } appearance-none bg-transparent border-none w-screen text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                  type="text"
                  placeholder={t("your-picture")}
                  aria-label="Full name"
                />
                <button
                  onClick={toggleImageForm}
                  className="flex-shrink-0 border-transparent border-4 text-grey-500 hover:text-grey-800 text-simibold text-sm py-1 px-2 rounded underline"
                  type="button"
                >
                  {nameForm ? <>{t("cancel")}</> : <>{t("edit")}</>}
                </button>
              </div>
              <div
                className={`${imageForm ? "" : "hidden"
                  } w-full max-w-md mx-auto mb-8`}
              >
                <h2 className="text-lg font-semibold mb-4">
                  {t("picture-desc")}
                </h2>
                <div className="my-4">
                  <Image src={image} width="200" height="200" alt={`${firstName} picture`} className="border-2 rounded-lg"/>
                  <CldUploadButton uploadPreset="airbnb-clone"
                    onSuccess={handleUpload}
                    options={{ sources: ["local"], maxFiles: 1, multiple: false }}
                    className="py-2 px-1 mt-3 bg-white hover:bg-[#f7f7f7] border border-black rounded-[8px]">
                    {t("change-pic")}
                  </CldUploadButton>
                </div>
                <div
                  onClick={changeImage}
                  className="cursor-pointer mt-6 w-fit bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {t("save")}
                </div>
              </div>





              <label>{t("email")}</label>
              <div className="flex items-center border-b border-grye-500 py-2 mb-10">
                <input
                  disabled
                  className={`${
                    emailForm ? "opacity-0" : ""
                  } appearance-none bg-transparent border-none w-screen text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                  type="text"
                  placeholder={email}
                  aria-label="Full name"
                />
                <button
                  onClick={toggleEmailForm}
                  className="flex-shrink-0 border-transparent border-4 text-grey-500 hover:text-grey-800 text-simibold text-sm py-1 px-2 rounded underline"
                  type="button"
                >
                  {emailForm ? <>{t("cancel")}</> : <>{t("edit")}</>}
                </button>
              </div>
              <div
                className={`${
                  emailForm ? "" : "hidden"
                } w-full max-w-md mx-auto mb-8`}
              >
                <h2 className="text-lg font-semibold mb-4">
                  {t("email-desc")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("email")}
                    </label>
                    <input
                      id="email"
                      type="text"
                      // pattern="^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div
                  onClick={changeEmail}
                  className="cursor-pointer mt-6 w-fit bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {t("save")}
                </div>
              </div>




              <label>{t("address")}</label>
              <div className="flex items-center border-b border-grye-500 py-2 mb-10">
                <input
                  disabled
                  className={`${addressForm ? "opacity-0" : ""
                  } appearance-none bg-transparent border-none w-screen text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`}
                  type="text"
                  placeholder={t("provided")}
                  aria-label="Full name"
                />
                <button
                  onClick={toggleAddressForm}
                  className="flex-shrink-0 border-transparent border-4 text-grey-500 hover:text-grey-800 text-simibold text-sm py-1 px-2 rounded underline"
                  type="button"
                >
                  {addressForm ? <>{t("cancel")}</> : <>{t("edit")}</>}
                </button>
              </div>
              <div
                className={`${
                  addressForm ? "" : "hidden"
                } w-full max-w-md mx-auto mb-8`}
              >
                <h2 className="text-lg font-semibold mb-4">
                  {t("adderess-desc")}
                </h2>
                <div className="my-2">
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("country")}
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={address.country}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="my-2">
                  <div>
                    <label
                      htmlFor="street"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("street")}
                    </label>
                    <input
                      id="street"
                      name="street"
                      type="text"
                      value={address.street}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex gap-2 my-2">
                  <div className="grow">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("city")}
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {t("code")}
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="number"
                      value={address.zip}
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div
                  onClick={changeAddress}
                  className="cursor-pointer mt-6 w-fit bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  {t("save")}
                </div>
              </div>
            </form>
          </div>

          <div className="hidden lg:block divide-y w-80 max-w-md p-4 bg-white border border-gray-200  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="">
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "48px",
                  width: "48px",
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                }}
              >
                <g>
                  <g stroke="none">
                    <path
                      d="M27 5l.585.005c4.29.076 8.837.984 13.645 2.737l.77.288V35.4l-.008.13a1 1 0 0 1-.47.724l-.116.06L27 42.716V25a1 1 0 0 0-.883-.993L26 24H12V8.029l.77-.286c4.797-1.75 9.336-2.658 13.62-2.737L27 5z"
                      fill-opacity=".2"
                    ></path>
                    <path d="M27 1c5.599 0 11.518 1.275 17.755 3.816a2 2 0 0 1 1.239 1.691L46 6.67V35.4a5 5 0 0 1-2.764 4.472l-.205.097-15.594 6.93L27 47l-2.461-1h2.451a.01.01 0 0 0 .007-.003L27 45.99v-1.085l15.218-6.763a3 3 0 0 0 1.757-2.351l.019-.194.006-.196V6.669l-.692-.278C37.557 4.128 32.121 3 27 3S16.443 4.128 10.692 6.391L10 6.67 9.999 24H8V6.669a2 2 0 0 1 1.098-1.786l.147-.067C15.483 2.275 21.401 1 27 1z"></path>
                  </g>
                  <g fill="none" stroke-width="2">
                    <path d="M4 24h22a1 1 0 0 1 1 1v20.99a.01.01 0 0 1-.01.01H4a1 1 0 0 1-1-1V25a1 1 0 0 1 1-1z"></path>
                    <path d="M21 25v-5a6 6 0 1 0-12 0v5"></path>
                    <circle cx="15" cy="35" r="2"></circle>
                  </g>
                </g>
              </svg>
              <p className="mb-5 mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("q1")}
              </p>
              <p className="mb-5 text-gray-500">
                {t("a1")}
              </p>
            </div>
            <div>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "48px",
                  width: "48px",
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                  marginTop: "30px",
                }}
              >
                <g stroke="none">
                  <path
                    d="m39 15.999v28.001h-30v-28.001z"
                    fill-opacity=".2"
                  ></path>
                  <path d="m24 0c5.4292399 0 9.8479317 4.32667079 9.9961582 9.72009516l.0038418.27990484v2h7c1.0543618 0 1.9181651.8158778 1.9945143 1.8507377l.0054857.1492623v32c0 1.0543618-.8158778 1.9181651-1.8507377 1.9945143l-.1492623.0054857h-34c-1.0543618 0-1.91816512-.8158778-1.99451426-1.8507377l-.00548574-.1492623v-32c0-1.0543618.81587779-1.9181651 1.85073766-1.9945143l.14926234-.0054857h7v-2c0-5.5228475 4.4771525-10 10-10zm17 14h-34v32h34zm-17 14c1.6568542 0 3 1.3431458 3 3s-1.3431458 3-3 3-3-1.3431458-3-3 1.3431458-3 3-3zm0 2c-.5522847 0-1 .4477153-1 1s.4477153 1 1 1 1-.4477153 1-1-.4477153-1-1-1zm0-28c-4.3349143 0-7.8645429 3.44783777-7.9961932 7.75082067l-.0038068.24917933v2h16v-2c0-4.418278-3.581722-8-8-8z"></path>
                </g>
              </svg>
              <p className="mb-5 mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("q2")}
              </p>
              <p className="mb-5 text-gray-500">
                {" "}
                {t("a2")}
              </p>
            </div>
            <div>
              <svg
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: "48px",
                  width: "48px",
                  fill: "rgb(227, 28, 95)",
                  stroke: "currentcolor",
                  marginTop: "30px",
                }}
              >
                <g stroke="none">
                  <path
                    d="M24 9C14.946 9 7.125 15.065 4.74 23.591L4.63 24l.013.054c2.235 8.596 9.968 14.78 18.99 14.943L24 39c9.053 0 16.875-6.064 19.26-14.59l.11-.411-.013-.052c-2.234-8.597-9.968-14.78-18.99-14.944L24 9z"
                    fill-opacity=".2"
                  ></path>
                  <path d="M24 5c11.18 0 20.794 7.705 23.346 18.413l.133.587-.133.587C44.794 35.295 35.181 43 24 43 12.82 43 3.206 35.295.654 24.588l-.133-.587.048-.216C2.985 12.884 12.69 5 24 5zm0 2C13.88 7 5.16 13.887 2.691 23.509l-.12.492.032.14c2.288 9.564 10.728 16.513 20.65 16.846l.377.01L24 41c10.243 0 19.052-7.056 21.397-16.861l.031-.14-.031-.138c-2.288-9.566-10.728-16.515-20.65-16.848l-.377-.01L24 7zm0 10a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10z"></path>
                </g>
              </svg>
              <p className="mb-5 mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {t("q3")}
              </p>
              <p className="mb-5 text-gray-500">
                {t("a3")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
