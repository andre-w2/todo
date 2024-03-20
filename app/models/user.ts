import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
   uids: ['email'],
   passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
   @column({ isPrimary: true })
   declare id: number

   @column({ prepare: (val: string) => (val ? val : randomUUID()) })
   declare user_id: string

   @column.dateTime({ autoCreate: true })
   declare createdAt: DateTime

   @column.dateTime({ autoCreate: true, autoUpdate: true })
   declare updatedAt: DateTime | null
}