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
      const label = document.createElement('label')
      label.className = 'rounded-full border relative cursor-pointer'
      label.for = `checkbox_${todo.id}`

      const inputCheckbox = document.createElement('input')
      inputCheckbox.type = 'checkbox'
      inputCheckbox.classList.add('hidden', 'peer')
      inputCheckbox.id = `checkbox_${todo.id}`
      inputCheckbox.checked = todo.isChecked

      inputCheckbox.addEventListener('change', (evt) => {
         const span = document
            .querySelector(`#checkbox_${todo.id}`)
            .closest('div')
            .querySelector('span')
         if (evt.target.checked) {
            span.classList.add('line-through')
         } else {
            span.classList.remove('line-through')
         }

         axios.put(`/todos/${todo.id}`, { isChecked: evt.target.checked }).catch(() => {
            error('Ups... Error').showToast()
         })
      })

      const img = document.createElement('img')
      img.src = '/assets/images/icon-check.svg'
      img.className = 'w-4 h-4 peer-checked:bg-primary-brightBlue'

      const span = document.createElement('span')
      span.classList.add('p-2', 'w-full', 'ml-3', 'cursor-pointer')
      span.className += todo.isChecked ? ' line-through' : ''
      span.textContent = todo.todo

      const deleteButton = document.createElement('button')
      deleteButton.classList.add('hidden', 'group-hover:block', 'cursor-pointer')
      deleteButton.innerHTML =
         '<img src="/assets/images/icon-cross.svg" class="w-4 h-4" alt="check">'

      deleteButton.addEventListener('click', () => {
         removeCard(todo.id)
      })

      label.appendChild(inputCheckbox)
      label.appendChild(img)
      div.appendChild(label)
      div.appendChild(span)
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
         lengthTodos()
         createCard(res.data)
      })
      .catch((err) => {
         console.log(err)
         error('get todos error').showToast()
      })
}
getTodos()

const bntClearCompleted = document.querySelector('#clear-completed')
bntClearCompleted.addEventListener('click', () => {
   axios.post('/todos/clear-complete').then((_) => {
      const findAll = [...document.querySelectorAll('#render input[type=checkbox]')].filter(
         (item) => item.checked
      )
      tododLength -= findAll.length
      lengthTodos()
      findAll.map((i) => i.closest('div').remove())
   })
})
