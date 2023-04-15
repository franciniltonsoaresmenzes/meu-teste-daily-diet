import { User } from '../../entities/user'

export interface UseCase {
  perform: (user: User) => Promise<any>
}
