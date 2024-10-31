import { FaApple, FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const SocialLoginButton = ({ provider, text }) => {
  const handleSocialLogin = () => {
  };

  const getIcon = (provider) => {
    switch (provider) {
      case 'facebook':
        return <FaFacebookSquare className="text-blue-500" />;
      case 'google':
        return <FcGoogle />;
      case 'apple':
        return <FaApple />;
    }
  };

  return (
    <button
      onClick={() => handleSocialLogin()}
      className='w-full py-3 bg-white text-black hover:bg-gray-100 rounded-xl transition duration-300 font-semibold flex items-center justify-center border border-gray-700'
    >
      <span className="mr-2">{getIcon(provider)}</span>
      <span>{text}</span>
    </button>
  );
};

export default SocialLoginButton;