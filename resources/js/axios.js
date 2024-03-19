import axios from 'axios'

axios.interceptors.request.use(async (config) => {
   const csrfToken = document.querySelector('input[name="_csrf"]').value
   config.headers['X-CSRF-TOKEN'] = csrfToken
   return config
})

export { axios }
