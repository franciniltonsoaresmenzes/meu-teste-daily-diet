import bcrypt from 'bcrypt'
import { UseCase } from '../port/use-case'
import { UserRepository } from './ports/user-repository'
import { User } from '../../entities/user'

export class LoginUser implements UseCase {
  public readonly repo: UserRepository

  constructor(repo: UserRepository) {
    this.repo = repo
  }

  async perform(user: User): Promise<any> {
    const email = user.email
    const password = user.password

    const found = await this.repo.findUser({ email, password })
    if (found instanceof Error) {
      return { login: false }
    }

    const hash = await bcrypt.compare(user.password, found.password)

    if (!hash) {
      return { login: false }
    }

    return { login: true, sessionId: found.sessionId }
  }
}
