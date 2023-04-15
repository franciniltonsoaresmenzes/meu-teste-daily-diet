import { UserData } from '../../../entities/user-data'

export interface UserRepository {
  add: (user: UserData) => Promise<void>
  exist: (email: string) => Promise<boolean>
  findUser: (user: UserData) => Promise<any | Error>
}
