/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:"http",
        hostname: "avatars.githubusercontent.com",
        port:"",
        pathname:"/**"
      },
      {
        protocol: "https",
        hostname: "a0.muscache.com",
        port: "", 
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", 
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
