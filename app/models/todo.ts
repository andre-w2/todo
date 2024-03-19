import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Todos extends BaseModel {
   @column({ isPrimary: true })
   declare id: number

   @column()
   declare todo: string

   @column()
   declare is_checked: boolean

   @column({})
   declare userId: string

   @column.dateTime({ autoCreate: true })
   declare createdAt: DateTime

   @column.dateTime({ autoCreate: true, autoUpdate: true })
   declare updatedAt: DateTime

   @belongsTo(() => User, {
      localKey: 'user_id',
      foreignKey: 'userId',
   })
   declare user: BelongsTo<typeof User>
}
