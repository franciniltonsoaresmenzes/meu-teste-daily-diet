import { describe, expect, it } from 'vitest'
import { UserData } from '../../../../src/entities/user-data'
import {
  InMemoryUserRepository,
  input,
} from '../../../../src/usecases/register-user/repository/in-memory-user-repository'

describe('In Memory user repository', () => {
  it('should return user if in the repository', async () => {
    const users: input[] = []
    const sut = new InMemoryUserRepository(users)
    const userData: UserData = {
      email: 'any@email.com',
      password: '123456',
    }

    await sut.add(userData)
    const user = await sut.exist(userData.email)
    expect(user).toBeTruthy()
  })

  it('should return null user is not found', async () => {
    const users: input[] = []
    const sut = new InMemoryUserRepository(users)
    const email = 'any@email.com'

    const user = await sut.exist(email)
    expect(user).toBeFalsy()
  })
})
