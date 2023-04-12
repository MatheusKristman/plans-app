export default function useVerified(setLogged) {

  const data = localStorage.getItem("token");
  const {verified} = JSON.parse(data)
  setLogged(verified)
}
