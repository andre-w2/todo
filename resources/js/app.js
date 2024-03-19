import.meta.glob(['../images/**'])
import { axios } from './axios.js'
import { success, error } from './toats.js'

const forms = document.forms

forms.item(0).addEventListener('submit', (evt) => {
   evt.preventDefault()
   const form = forms.item(0)
   const isChecked = form.checkbox.checked
   const todo = form.todo.value

   if (todo.trim().length >= 2) {
      axios
         .post('/todos', { isChecked, todo })
         .then((res) => {
            form.reset()
            success('Success!').showToast()
         })
         .catch((err) => {
            console.log(`ERROR: ${err}`)
            error('Ups... Error').showToast()
         })
   } else {
      error('Fill in the field').showToast()
   }
})

const createTodo = () => {
   axios.get('/todos').then((res) => {
      console.log(res)
   })
}
