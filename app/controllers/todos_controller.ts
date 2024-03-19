import TodosServices from '#services/todos_services'
import { createTodosValidator } from '#validators/todo'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class TodosController {
   constructor(protected todosServices: TodosServices) {}

   async index() {
      return await this.todosServices.index()
   }

   async store({ request }: HttpContext) {
      const data = await request.validateUsing(createTodosValidator)
      return this.todosServices.create(data)
   }

   // async show({ params }: HttpContext) {}

   // async update({ params, request }: HttpContext) {}

   async destroy({ params }: HttpContext) {
      return this.todosServices.destroy(params.id)
   }
}
