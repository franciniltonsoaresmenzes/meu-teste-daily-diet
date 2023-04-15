import { User } from '../../entities/user'
import { UseCase } from '../port/use-case'
import { UserRepository } from './ports/user-repository'
import bcrypt from 'bcrypt'

export class RegisterUser implements UseCase {
  private readonly userRepo: UserRepository

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  async perform(request: User): Promise<any> {
    const email = request.email
    const password = await this.encrypt(request.password)

    const userData = { email, password }

    const found = await this.userRepo.exist(email)

    if (!found) {
      await this.userRepo.add(userData)
    }
  }

  async encrypt(password: string): Promise<string> {
    const saltsRounds = 10
    const hashPassword = await bcrypt.hash(password, saltsRounds)

    return hashPassword
  }
}
