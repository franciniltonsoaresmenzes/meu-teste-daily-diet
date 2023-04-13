import { randomUUID } from 'node:crypto'
import { UserData } from '../../../entities/user-data'
import { UserRepository } from '../ports/user-repository'

export type input = UserData & {
  id: string
}

export type output = { user: UserData }

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
