import { randomUUID } from 'node:crypto'
import { UserData } from '../../../entities/user-data'
import { UserRepository } from '../ports/user-repository'

export type input = UserData & {
  id: string
}

export class InMemoryUserRepository implements UserRepository {
  public readonly repository: input[]

  constructor(repository: input[]) {
    this.repository = repository
  }

  async add(user: UserData): Promise<void> {
    const found = await this.exist(user.email)
    if (!found) {
      this.repository.push({ id: randomUUID(), ...user })
    }
  }

  async exist(email: string): Promise<boolean> {
    const found = this.repository.find((user) => user.email === email)

    if (found === undefined) {
      return false
    }

    return true
  }
}
