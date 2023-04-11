export default function login(email, password) {
  const options = {
    method: 'POST',
    body: {
      email,
      password,
    },
  };

  fetch('https://planos-backend.onrender.com/admin/login', options)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
