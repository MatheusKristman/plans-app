const options = {
  method: 'GET',
}

export const fetchFromApi = async () => {
  const response = await fetch('https://planos-backend.onrender.com/plan/all', options)

  const data = await response.json()

  return data
}
