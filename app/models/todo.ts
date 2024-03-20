import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Todos extends BaseModel {
   @column({ isPrimary: true })
   declare id: number

   @column()
   declare todo: string

   @column()
   declare is_checked: boolean

   @column()
   declare userId: string

   @column.dateTime({ autoCreate: true })
   declare createdAt: DateTime

   @column.dateTime({ autoCreate: true, autoUpdate: true })
   declare updatedAt: DateTime
}
