import { UserData, userDataschema } from './user-data'

type output = { user: UserData | boolean }

export class User {
  public readonly email: string
  public readonly password: string

  private constructor({ email, password }: UserData) {
    this.email = email
    this.password = password
  }

  public static create(user: UserData): output {
    if (this.validation(user) === false) {
      return { user: false }
    }
    return { user }
  }

  public static validation(user: UserData) {
    const validation = userDataschema.safeParse(user)

    if (validation.success) {
      return true
    }
    return false
  }
}
