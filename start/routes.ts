const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [TodosController, 'render'])

router.resource('/todos', TodosController).apiOnly()
router.post('/todos/clear-complete', [TodosController, 'clearComplete'])
