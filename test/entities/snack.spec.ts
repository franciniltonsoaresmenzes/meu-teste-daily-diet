import { describe, expect, it } from 'vitest'
import { z } from 'zod'

const schemaSnackData = z.object({
  name: z.string().min(3).max(25),
  description: z.string().min(6).max(35),
  date: z.date(),
  withinDiet: z.boolean(),
})

type SncakData = z.infer<typeof schemaSnackData>

class Snack {
  public readonly name: string
  public readonly description: string
  public readonly date: Date
  public readonly withinDiet: boolean

  public constructor({ name, description, date, withinDiet }: SncakData) {
    this.name = name
    this.description = description
    this.date = date
    this.withinDiet = withinDiet
  }

  static create(data: SncakData) {
    const validaion = this.validation(data)

    if (validaion) {
      return new Snack(data)
    }

    return new Error('Invalid')
  }

  static validation(data: SncakData) {
    const validation = schemaSnackData.safeParse(data)
    if (validation.success) {
      return true
    }

    return false
  }
}

describe('Snack', () => {
  it('should create new sncack', () => {
    const data: SncakData = {
      name: 'Pão',
      description: 'Pão Francê',
      date: new Date(),
      withinDiet: true,
    }
    const snack = Snack.create(data)

    expect(snack).instanceof(Snack)
    expect(snack.name).toBe('Pão')
  })

  it('should not create invalid sncack', () => {
    const data: SncakData = {
      name: 'Pão'.repeat(10),
      description: 'Pão Francê',
      date: new Date(),
      withinDiet: true,
    }
    const snack = Snack.create(data)
    expect(snack).instanceof(Error)
  })
})
