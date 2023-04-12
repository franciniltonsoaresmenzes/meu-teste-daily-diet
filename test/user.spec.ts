import { describe, expect, it } from 'vitest'

interface UserData {
  email: string
  password: string
}

class User {
  public readonly email: string
  public readonly password: string

  private constructor({ email, password }: UserData) {
    this.email = email
    this.password = password
  }

  public static create(userData: UserData) {
    return userData
  }
}

describe('User', () => {
  it('should create user valid', () => {
    const email = 'any@email.com'
    const password = 'any name'
    const user = User.create({ email, password })

    expect(user.email).toEqual(email)
  })
})
