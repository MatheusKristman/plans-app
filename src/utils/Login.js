import Auth from "./Auth/Auth";

export default async function login(email, password, setLogged) {

  const formData = new FormData();

  formData.append('email', email);
  formData.append('password', password);

  const options = {
    method: 'POST',
    body: formData,
  };

  const response = await fetch('https://planos-backend.onrender.com/admin/login', options)

  const data = await response.json();

  Auth(data, setLogged)

}
