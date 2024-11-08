"use server"
const api = process.env.NEXT_PUBLIC_API_URL
export const getUser = async (token) => {
  const res = await fetch(`${api}/user/info`, {
    method: "GET",
    headers: {
      'authorization': token, mode: 'cors'
    },
  });
  const user = await res.json();
  console.log(user);
  return user
};