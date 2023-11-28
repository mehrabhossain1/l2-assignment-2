import { TUser } from './user.interface'
import UserModel from './user.model'

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const result = await UserModel.create(userData)
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

const getSingleUserFromDB = async (userId: number): Promise<TUser[] | null> => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User already exists')
  }

  const result = await UserModel.aggregate([
    {
      $match: { userId },
    },
  ]).project({ password: 0 })

  return result
}

const getUpdatedUserFromDB = async (
  userId: number,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: userId },
    userData,
    {
      new: true,
      runValidators: true,
    },
  ).select('-password')

  return result
}

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getUpdatedUserFromDB,
}
