import { describe, expect, it } from 'vitest'
import {
  InMemoryUserRepository,
  input,
} from '../../../src/usecases/register-user/repository/in-memory-user-repository'
import { User } from '../../../src/entities/user'
import { UserData } from '../../../src/entities/user-data'
import { RegisterUser } from '../../../src/usecases/register-user/register-user'

describe('Register user', () => {
  it('should add user with complete data', async () => {
    const users: input[] = []
    const repo = new InMemoryUserRepository(users)
    const usecase = new RegisterUser(repo)
    const userData: UserData = {
      email: 'any@email.com',
      password: '123456',
    }

    const data = User.create(userData) as User
    await usecase.perform(data)
    const reponse = await repo.exist(userData.email)
    expect(reponse).toBeTruthy()
  })
})
