import vine from '@vinejs/vine'

export const createTodosValidator = vine.compile(
   vine.object({
      isChecked: vine.boolean(),
      todo: vine.string().trim().minLength(2),
   })
)
