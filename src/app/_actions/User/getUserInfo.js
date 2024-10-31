"use server"
export const getUser = async (token) => {
  const res = await fetch(`http://localhost:3000/user/info`, {
    method: "GET",
    headers: {
      'authorization': token, mode: 'cors'
    },
  });
  const user = await res.json();
  console.log(user);
  return user
};