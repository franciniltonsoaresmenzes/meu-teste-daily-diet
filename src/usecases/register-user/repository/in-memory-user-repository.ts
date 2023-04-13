import { randomUUID } from 'node:crypto'
import { UserData } from '../../../entities/user-data'

export type input = UserData & {
  id: string
}

type output = { user: UserData }

interface UserRepository {
  add: (user: UserData) => Promise<void>
  finUserByEmail: (email: string) => Promise<output | null>
}

export class InMemoryUserRepository implements UserRepository {
  public readonly repository: input[]

  constructor(repository: input[]) {
    this.repository = repository
  }

  async add(user: UserData): Promise<void> {
    this.repository.push({ id: randomUUID(), ...user })
  }

  async finUserByEmail(email: string): Promise<output | null> {
    const found = this.repository.find((user) => user.email === email)

    if (found === undefined) {
      return null
    }

    return { user: { email: found.email, password: found.password } }
  }
}
