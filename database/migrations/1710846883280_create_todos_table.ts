import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
   protected tableName = 'todos'

   async up() {
      this.schema.createTable(this.tableName, (table) => {
         table.increments('id').notNullable()

         table.string('todo').notNullable()
         table.boolean('is_checked').defaultTo(false)

         table.string('user_id').notNullable()
         table.timestamps(true, true)
      })
   }

   async down() {
      this.schema.dropTable(this.tableName)
   }
}
