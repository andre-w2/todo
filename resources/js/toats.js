import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

export const success = (text) =>
   Toastify({
      text,
      duration: 2000,
      close: true,
      stopOnFocus: true,
      style: {
         background: 'linear-gradient(to right, #00b09b, #96c93d)',
      },
   })

export const error = (text) =>
   Toastify({
      text,
      duration: 2000,
      close: true,
      stopOnFocus: true,
      style: {
         background: 'linear-gradient(to right, #ff2400, #ff5050)',
      },
   })
