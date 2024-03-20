import TodosServices from '#services/todos_services'
import { createTodosValidator, updateTodosValidator } from '#validators/todo'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { randomUUID } from 'node:crypto'

@inject()
export default class TodosController {
   constructor(protected todosServices: TodosServices) {}

   async render({ request, response, view }: HttpContext) {
      const userId = request.cookie('user_id')
      if (!userId) {
         const oneYear = 365 * 24 * 60 * 60 * 1000
         response.cookie('user_id', randomUUID(), {
            httpOnly: true,
            secure: true,
            maxAge: oneYear,
         })
      }

      return view.render('pages/home')
   }

   async index({ request }: HttpContext) {
      return await this.todosServices.index(request)
   }

   async store({ request }: HttpContext) {
      const data = await request.validateUsing(createTodosValidator)
      return this.todosServices.create(data, request.cookie('user_id', ''))
   }

   async update({ params, request }: HttpContext) {
      const data = await request.validateUsing(updateTodosValidator)
      return this.todosServices.update(data, params.id, request.cookie('user_id', ''))
   }

   async destroy({ params, request }: HttpContext) {
      return this.todosServices.destroy(params.id, request.cookie('user_id', ''))
   }

   async clearComplete({ request }: HttpContext) {
      return this.todosServices.clearComplete(request.cookie('user_id', ''))
   }
}
