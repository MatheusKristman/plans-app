import useVerified from "../getVerified";

export default async function Auth({token}, setLogged) {

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await fetch('https://planos-backend.onrender.com/admin/is-admin', options);

  const data = await response.json();

  localStorage.setItem("token", JSON.stringify(data))

  useVerified(setLogged);
}
