import { UserData } from '../../../entities/user-data'
import { output } from '../repository/in-memory-user-repository'

export interface UserRepository {
  add: (user: UserData) => Promise<void>
  findUserByEmail: (email: string) => Promise<output | null>
}
