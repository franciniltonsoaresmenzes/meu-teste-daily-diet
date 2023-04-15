import { describe, it, expect } from 'vitest'
import {
  InMemoryUserRepository,
  input,
} from '../../../src/usecases/register-user/repository/in-memory-user-repository'
import { User } from '../../../src/entities/user'
import { UserData } from '../../../src/entities/user-data'
import { LoginUser } from '../../../src/usecases/register-user/login-user'

describe('Login User', () => {
  it('should login user', async () => {
    const users: input[] = [
      {
        id: '123',
        email: 'any@email.com',
        password:
          '$2b$10$8Qz3TDtkHgeUs2ZQo8vsee6CsZU3cdWVoh8Fh9A53m.sJFDRdS14q', // 123456
        sessionId: '123456',
      },
    ]
    const repo = new InMemoryUserRepository(users)
    const usecase = new LoginUser(repo)
    const userData: UserData = {
      email: 'any@email.com',
      password: '123456',
    }

    const data = User.create(userData) as User
    const reponse = await usecase.perform(data)

    expect(reponse.login).toBeTruthy()
  })

  it('should not login user', async () => {
    const users: input[] = [
      {
        id: '123',
        email: 'any@email.com',
        password:
          '$2b$10$8Qz3TDtkHgeUs2ZQo8vsee6CsZU3cdWVoh8Fh9A53m.sJFDRdS14q',
        sessionId: '123456',
      },
    ]
    const repo = new InMemoryUserRepository(users)
    const usecase = new LoginUser(repo)
    const userData: UserData = {
      email: 'any@email.com',
      password: '1234567',
    }

    const data = User.create(userData) as User
    const reponse = await usecase.perform(data)

    expect(reponse.login).toBeFalsy()
  })
})
