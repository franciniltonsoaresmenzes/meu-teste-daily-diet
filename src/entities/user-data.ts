import { z } from 'zod'

export const userDataschema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).max(8).nonempty(),
})

export type UserData = z.infer<typeof userDataschema>
