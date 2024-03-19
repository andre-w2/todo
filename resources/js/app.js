import.meta.glob(['../images/**'])
import { axios } from './axios.js'
import { success, error } from './toats.js'

const forms = document.forms
let tododLength = 0

forms.item(0).addEventListener('submit', (evt) => {
   evt.preventDefault()
   const form = forms.item(0)
   const isChecked = form.checkbox.checked
   const todo = form.todo.value

   if (todo.trim().length >= 2) {
      axios
         .post('/todos', { isChecked, todo })
         .then((res) => {
            tododLength += 1
            lengthTodos()
            createCard([res.data], false)

            form.reset()
            success('Success').showToast()
         })
         .catch((err) => {
            console.log(`ERROR: ${err}`)
            error('Ups... Error').showToast()
         })
   } else {
      error('Fill in the field').showToast()
   }
})

const removeCard = (id) => {
   document.querySelector(`#todo_${id}`).remove()
   axios
      .delete(`/todos/${id}`)
      .then((res) => {
         tododLength -= 1
         lengthTodos()
         success('Delete').showToast()
      })
      .catch((err) => {
         console.log(`ERROR: ${err}`)
         error('Ups... Error').showToast()
      })
}

const createCard = (data, isEnd = true) => {
   const container = document.querySelector('#render')

   data.forEach((todo) => {
      const div = document.createElement('div')
      div.classList.add(
         'flex',
         'bg-white',
         'py-2',
         'px-4',
         'items-center',
         'group',
         'border',
         'border-b-2'
      )
      div.id = `todo_${todo.id}`
      const button = document.createElement('button')
      button.classList.add('rounded-full', 'border')
      button.innerHTML = todo.isChecked
         ? '<img src="/assets/images/icon-check.svg" class="w-4 h-4 bg-neutral-veryDarkGrayishBlue" alt="check">'
         : '<img src="/assets/images/icon-check.svg" class="w-4 h-4" alt="check">'

      const input = document.createElement('input')
      input.classList.add('outline-none', 'p-2', 'w-full', 'ml-3', 'cursor-pointer')
      input.type = 'text'
      input.value = todo.todo

      const deleteButton = document.createElement('button')
      deleteButton.classList.add('hidden', 'group-hover:block', 'cursor-pointer')
      deleteButton.innerHTML =
         '<img src="/assets/images/icon-cross.svg" class="w-4 h-4" alt="check">'

      deleteButton.addEventListener('click', () => {
         removeCard(todo.id)
      })

      div.appendChild(button)
      div.appendChild(input)
      div.appendChild(deleteButton)

      if (isEnd) {
         container.appendChild(div)
      } else {
         container.insertBefore(div, container.firstChild)
      }
   })
}

const lengthTodos = () => {
   document.querySelector('#countTodos').innerHTML = `${tododLength} items left`
}

const getTodos = () => {
   axios
      .get('/todos')
      .then((res) => {
         tododLength = res.data.length
         createCard(res.data)
      })
      .catch((err) => {
         console.log(err)
         error('get todos error').showToast()
      })
}
getTodos()
