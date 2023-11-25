import { TUser } from './user.interface'
import UserModel from './user.model'

const createUserIntoDB = async (user: TUser): Promise<TUser> => {
  const result = await UserModel.create(user)
  return result
}

const getAllUsersFromDB = async (): Promise<TUser[]> => {
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

const getSingleUserFromDB = async (id: number): Promise<TUser[] | null> => {
  const result = await UserModel.aggregate([
    {
      $match: { userId: id },
    },
  ])

  return result
}

const getUpdatedUserFromDB = async (
  id: number,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndUpdate({ userId: id }, userData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteUserFromDB = async (id: number): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndDelete(id)
  return result
}

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getUpdatedUserFromDB,
  deleteUserFromDB,
}
