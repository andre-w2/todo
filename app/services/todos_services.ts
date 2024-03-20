import Todos from '#models/todo'

type TodosType = {
   isChecked: boolean
   todo?: string
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

   async update(data: TodosType, id: string) {
      return await Todos.query().where('id', id).update({ is_checked: data.isChecked })
   }

   async destroy(id: string) {
      return await Todos.query().where('id', id).delete()
   }

   async clearComplete() {
      return await Todos.query().where('is_checked', 1).delete()
   }
}
