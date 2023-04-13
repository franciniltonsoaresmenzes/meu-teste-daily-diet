import { describe, expect, it } from 'vitest'
import { User } from '../../src/entities/user'

describe('User', () => {
  it('should create user valid', () => {
    const data = {
      email: 'any@email.com',
      password: '123456',
    }
    const user = User.create(data)

    expect(user.user).toEqual(data)
  })

  it('should not create user with e-mail invalid', () => {
    const email = 'any@'
    const password = '123456'
    const user = User.create({ email, password })

    expect(user.user).toBeFalsy()
  })

  it('should not create user with password invalid', () => {
    const email = 'any@email.com'
    const password = '123'
    const user = User.create({ email, password })

    expect(user.user).toBeFalsy()
  })
})
