import { axios } from './axios.js'
import { success, error } from './toats.js'

const forms = document.forms
const todosContainer = document.querySelector('#render')
const urlParams = new URLSearchParams(window.location.search)
const body = document.querySelector('body')

let todosLength = 0

const element =
   document.querySelector(`nav > [href="?status=${urlParams.get('status')}"]`) ||
   document.querySelector('nav [href]')

if (element) {
   element.classList.add('text-primary-brightBlue', 'dark:text-primary-brightBlue')
}

if (
   localStorage.theme === 'dark' ||
   (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
   body.classList.remove("bg-[url('/public/assets/images/bg-desktop-light.jpg')]")
   body.classList.add("bg-[url('/public/assets/images/bg-desktop-dark.jpg')]")
   document.documentElement.classList.add('dark')
} else {
   document.documentElement.classList.remove('dark')
}

const switchTheme = (evt) => {
   if (localStorage.theme === 'dark') {
      evt.target.src = '/assets/images/icon-moon.svg'
      body.classList.remove("bg-[url('/public/assets/images/bg-desktop-dark.jpg')]")
      body.classList.add("bg-[url('/public/assets/images/bg-desktop-light.jpg')]")
      localStorage.removeItem('theme')
      document.documentElement.classList.remove('dark')
   } else {
      body.classList.remove("bg-[url('/public/assets/images/bg-desktop-light.jpg')]")
      body.classList.add("bg-[url('/public/assets/images/bg-desktop-dark.jpg')]")
      evt.target.src = '/assets/images/icon-sun.svg'
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
   }
}
document.querySelector('#switchTheme').addEventListener('click', switchTheme)

forms.item(0).addEventListener('submit', (evt) => {
   evt.preventDefault()
   const form = forms.item(0)
   const isChecked = form.checkbox.checked
   const todo = form.todo.value.trim()

   if (todo.length >= 2) {
      axios
         .post('/todos', { isChecked, todo })
         .then(({ data }) => {
            todosLength += 1
            lengthTodos()
            createCard([data], false)

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
         todosLength -= 1
         lengthTodos()
         success('Delete').showToast()
      })
      .catch((err) => {
         console.log(`ERROR: ${err}`)
         error('Ups... Error').showToast()
      })
}

const createCard = (data, isEnd = true) => {
   data.forEach((todo) => {
      const { id, isChecked, todo: todoText } = todo
      const div = document.createElement('div')
      div.classList.add(
         'flex',
         'bg-white',
         'py-2',
         'px-4',
         'items-center',
         'group',
         'border-b-2',
         'dark:border-neutral-darkGrayishBlue',
         'dark:bg-neutral-veryDarkDesaturatedBlue'
      )
      div.id = `todo_${id}`

      const label = document.createElement('label')
      label.className = 'rounded-full border relative cursor-pointer'
      label.for = `checkbox_${id}`

      const inputCheckbox = document.createElement('input')
      inputCheckbox.type = 'checkbox'
      inputCheckbox.classList.add('hidden', 'peer')
      inputCheckbox.id = `checkbox_${id}`
      inputCheckbox.checked = isChecked

      inputCheckbox.addEventListener('change', handleCheckboxChange)

      const img = document.createElement('img')
      img.src = '/assets/images/icon-check.svg'
      img.className = 'w-4 h-4 peer-checked:bg-primary-brightBlue'

      const span = document.createElement('span')
      span.classList.add(
         'p-2',
         'w-full',
         'ml-3',
         'cursor-pointer',
         'dark:text-neutral-darkGrayishBlue'
      )
      span.className += isChecked ? ' line-through' : ''
      span.textContent = todoText

      const deleteButton = document.createElement('button')
      deleteButton.classList.add('hidden', 'group-hover:block', 'cursor-pointer')
      deleteButton.innerHTML =
         '<img src="/assets/images/icon-cross.svg" class="w-4 h-4" alt="check">'
      deleteButton.addEventListener('click', () => removeCard(id))

      label.appendChild(inputCheckbox)
      label.appendChild(img)
      div.appendChild(label)
      div.appendChild(span)
      div.appendChild(deleteButton)

      if (isEnd) {
         todosContainer.appendChild(div)
      } else {
         todosContainer.insertBefore(div, todosContainer.firstChild)
      }
   })
}

const handleCheckboxChange = (evt) => {
   const span = evt.target.closest('div').querySelector('span')

   if (evt.target.checked) {
      span.classList.add('line-through')
   } else {
      span.classList.remove('line-through')
   }

   axios
      .put(`/todos/${evt.target.id.split('_')[1]}`, { isChecked: evt.target.checked })
      .catch(() => error('Ups... Error').showToast())
}

const lengthTodos = () => {
   document.querySelector('#countTodos').innerHTML = `${todosLength} items left`
}

const getTodos = () => {
   axios
      .get(`/todos?status=${urlParams.get('status')}`)
      .then(({ data }) => {
         todosLength = data.length
         lengthTodos()
         createCard(data)
      })
      .catch((err) => {
         console.log(err)
         error('get todos error').showToast()
      })
}
getTodos()

const bntClearCompleted = document.querySelector('#clear-completed')
bntClearCompleted.addEventListener('click', () => {
   axios.post('/todos/clear-complete').then(() => {
      const checkedTodos = [...document.querySelectorAll('#render input[type=checkbox]')].filter(
         (item) => item.checked
      )

      todosLength -= checkedTodos.length
      lengthTodos()

      checkedTodos.forEach((item) => item.closest('div').remove())
   })
})
