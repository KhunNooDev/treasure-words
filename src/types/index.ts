import { User } from '@prisma/client'
import { Session } from 'next-auth'

// export type SafeUser = Omit<User, 'createdAt' | 'updatedAt' | 'emailVerified'> & {
//   createdAt: string
//   updatedAt: string
//   emailVerified: string | null
// }

export type SafeUser = Session['user'] | null