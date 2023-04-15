import { describe, expect, it } from 'vitest'
import { User } from '../../src/entities/user'

describe('User', () => {
  it('should not create user with e-mail invalid', () => {
    const email = 'any@'
    const password = '123456'
    const user = User.create({ email, password })

    expect(user).toBeFalsy()
  })

  it('should not create user with password invalid', () => {
    const email = 'any@email.com'
    const password = '123'
    const user = User.create({ email, password })

    expect(user).toBeFalsy()
  })
})
