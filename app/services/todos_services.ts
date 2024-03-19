import Todos from '#models/todo'

type TodosType = {
   isChecked: boolean
   todo: string
}

export default class TodosServices {
   async index() {
      return await Todos.all()
   }

   async create(data: TodosType) {
      const find = Todos.create({
         todo: data.todo,
         is_checked: data.isChecked,
      })

      return find
   }
}
