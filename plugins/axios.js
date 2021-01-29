export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const token = localStorage.getItem('api-token')
    if (!token) $axios.setHeader('X-API-TOKEN', '123')
  })

  // $axios.onError((error) => {})
}
