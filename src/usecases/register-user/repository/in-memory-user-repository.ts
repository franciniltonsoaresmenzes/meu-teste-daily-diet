import { randomUUID } from 'node:crypto'
import { UserData } from '../../../entities/user-data'
import { UserRepository } from '../ports/user-repository'

export type input = UserData & {
  id: string
  sessionId?: string
}

export class InMemoryUserRepository implements UserRepository {
  public readonly repository: input[]

  constructor(repository: input[]) {
    this.repository = repository
  }

  async add(user: UserData): Promise<void> {
    const found = await this.exist(user.email)
    if (!found) {
      this.repository.push({
        id: randomUUID(),
        ...user,
        sessionId: randomUUID(),
      })
    }
  }

  async exist(email: string): Promise<boolean> {
    const found = this.repository.find((user) => user.email === email)

    if (found === undefined) {
      return false
    }

    return true
  }

  async findUser(user: UserData): Promise<any | Error> {
    const found = this.repository.find((data) => data.email === user.email)
    if (found === undefined) {
      return new Error('Email invalido')
    }
    return {
      email: found!.email,
      password: found!.password,
      sessionId: found!.sessionId,
    }
  }
}
