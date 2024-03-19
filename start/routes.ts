const TodosController = () => import('#controllers/todos_controller')
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home')

router.resource('/todos', TodosController).apiOnly()
