const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [TodosController, 'index'])

router.resource('/todos', TodosController).apiOnly()
