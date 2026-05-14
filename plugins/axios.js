export default function ({ $axios }) {
  $axios.onError(error => {
    console.error('[Axios Error]', error.response?.status, error.message)
  })
}
