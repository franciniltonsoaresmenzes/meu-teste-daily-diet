import { UserData, userDataschema } from './user-data'

export class User {
  public readonly email: string
  public readonly password: string

  private constructor({ email, password }: UserData) {
    this.email = email
    this.password = password
  }

  public static create(user: UserData): User | boolean {
    if (this.validation(user) === false) {
      return false
    }
    return new User(user)
  }

  public static validation(user: UserData) {
    const validation = userDataschema.safeParse(user)

    if (validation.success) {
      return true
    }
    return false
  }
}
