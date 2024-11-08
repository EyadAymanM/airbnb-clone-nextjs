'use client';

import { signIn, useSession } from 'next-auth/react';
import { FaApple, FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { useEffect, useState } from 'react';

const SocialLoginButton = ({ provider, text }) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async () => {
    setLoading(true);
    try {
      let res;

      if (provider === 'google') {
        res = await signIn('google', {
          redirect: false,
        });

        if (res?.ok && session?.user) {
          await sendUserDataToBackend(session.user.token.jti);
        } else {
          console.error('Google login failed');
        }
      } else {
        res = await signIn(provider, { redirect: true, callbackUrl: '/' });
        if (!res?.ok) {
          throw new Error(`${provider} login failed`);
        }
      }
    } catch (error) {
      console.error(`Error logging in with ${provider}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const sendUserDataToBackend = async (idToken) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/auth/google-login`, {
        idToken,
      });
      console.log('User data successfully sent:', response.data);
    } catch (error) {
      console.error('Error sending user data to the backend:', error);
    }
  };

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

  // useEffect(() => {
  //   if (session?.user?.idToken) {
  //     sendUserDataToBackend(session.user.idToken);
  //   }
  // }, [session]);

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