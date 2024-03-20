import Todos from '#models/todo'
import { Request } from '@adonisjs/core/http'

type TodosType = {
   isChecked: boolean
   todo?: string
}

export default class TodosServices {
   async index(request: Request) {
      const status = request.qs()['status']
      const userId = request.cookie('user_id', '')

      if (status === 'active') {
         return await Todos.query().where('is_checked', 0).where('user_id', userId)
      } else if (status === 'completed') {
         return await Todos.query().where('is_checked', 1).where('user_id', userId)
      }
      return await Todos.query().where('user_id', userId)
   }

   async create(data: TodosType, userId: string) {
      const find = Todos.create({
         todo: data.todo,
         is_checked: data.isChecked,
         userId,
      })

      return find
   }

   async update(data: TodosType, id: string, userId: string) {
      return await Todos.query()
         .where('id', id)
         .where('user_id', userId)
         .update({ is_checked: data.isChecked })
   }

   async destroy(id: string, userId: string) {
      return await Todos.query().where('id', id).where('userId', userId).delete()
   }

   async clearComplete(userId: string) {
      return await Todos.query().where('is_checked', 1).where('userId', userId).delete()
   }
}
