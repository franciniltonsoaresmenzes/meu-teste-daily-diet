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

  it('should return false user is not found', async () => {
    const users: input[] = []
    const sut = new InMemoryUserRepository(users)
    const email = 'any@email.com'

    const user = await sut.exist(email)
    expect(user).toBeFalsy()
  })

  it('should not create users with the same email', async () => {
    const users: input[] = [
      {
        id: '11313131',
        email: 'any@email.com',
        password: '123456',
      },
    ]
    const sut = new InMemoryUserRepository(users)

    const userData: UserData = {
      email: 'any@email.com',
      password: '123456789',
    }
    await sut.add(userData)

    expect(sut.repository.length).toBe(1)
  })
})
