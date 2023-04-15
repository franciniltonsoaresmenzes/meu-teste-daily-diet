import { User } from '../../entities/user'
import { UseCase } from '../port/use-case'
import { UserRepository } from './ports/user-repository'

export class RegisterUser implements UseCase {
  private readonly userRepo: UserRepository

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  async perform(request: User): Promise<any> {
    const email = request.email
    const password = request.password

    const userData = { email, password }

    const found = await this.userRepo.exist(email)

    if (!found) {
      await this.userRepo.add(userData)
    }
  }
}
