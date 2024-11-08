'use client';

import { signIn, useSession } from 'next-auth/react';
import { FaApple, FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { sendUserDataToBackend } from '@/app/_actions/User/user';

const SocialLoginButton = ({ provider, text }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async () => {
    setLoading(true);
    try {
      const res = await signIn(provider, { redirect: true, callbackUrl: '/' });

      if (res?.ok && provider === 'google' && session?.user?.idToken) {
        console.log('Google login successful, sending data to backend...');
        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`, {
            idToken: session.user.idToken,
          });
          console.log('User data successfully sent:', response.data);
          return response.data;
        } catch (error) {
          console.error('Error sending user data to the backend:', error);
        }
      }
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user && session.user.idToken) {
      console.log('Google login detected, sending user data...');
      sendUserDataToBackend(session.user.idToken);
    }
  }, [session, provider]);

  const getIcon = (provider) => {
    switch (provider) {
      case 'facebook':
        return <FaFacebookSquare className="text-blue-500" />;
      case 'google':
        return <FcGoogle />;
      case 'apple':
        return <FaApple />;
      default:
        return null;
    }
  };

  return (
    <button
      onClick={handleSocialLogin}
      className={`w-full py-3 bg-white text-black hover:bg-gray-100 rounded-xl transition duration-300 font-semibold flex items-center justify-center border border-gray-700 ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={loading}
    >
      <span className="mx-2">{getIcon(provider)}</span>
      <span>{text}</span>
    </button>
  );
};

export default SocialLoginButton;