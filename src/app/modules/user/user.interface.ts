import { Model } from 'mongoose'

export type TUser = {
  userId: number
  username: string
  password: string
  fullName: {
    firstName: string
    lastName: string
  }
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: {
    street: string
    city: string
    country: string
  }
  isDeleted: boolean
  orders: [
    {
      productName: string
    },
    {
      price: number
    },
    {
      quantity: number
    },
  ]
}

export interface IUserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>
}

// export type TUserMethods = {
//   isUserExists(userId: number): Promise<TUser | null>
// }

// export type TUserModel = Model<TUser, Record<string, never>, TUserMethods>
