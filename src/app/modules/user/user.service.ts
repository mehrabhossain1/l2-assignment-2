import { TUser } from './user.interface'
import UserModel from './user.model'

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUsersFromDB = async () => {
  // const options = {
  //   projection: { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  // }

  // const projection = {username: 1, fullName: 1, age: 1, email: 1, address: 1 }

  const result = await UserModel.aggregate([
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ])
  return result
}
export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
}
