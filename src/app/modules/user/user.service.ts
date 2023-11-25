import { TUser } from './user.interface'
import UserModel from './user.model'

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUsersFromDB = async () => {
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

const getSingleUserFromDB = async (id: number) => {
  const result = await UserModel.aggregate([
    {
      $match: { userId: id },
    },
  ])

  return result
}

// const updateUserInDB = async (id: number, userData: TUser) => {
//   console.log(id)
//   const result = await UserModel.findByIdAndUpdate(id, userData, {
//     new: true,
//     runValidators: true,
//   })

//   return result
// }

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  // updateUserInDB,
}
