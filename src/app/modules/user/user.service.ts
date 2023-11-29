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
        _id: 0,
      },
    },
  ])
  return result
}

const getSingleUserFromDB = async (userId: number): Promise<TUser[] | null> => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.aggregate([
      {
        $match: { userId },
      },
    ]).project({ password: 0, _id: 0, orders: 0, __v: 0 })

    return result
  } else {
    throw new Error('No users in the db with this id')
  }
}

const getUpdatedUserFromDB = async (
  userId: number,
  userData: TUser,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<TUser | null> => {
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('No users in the db with this id')
  } else {
    const result = await UserModel.findOneAndUpdate(
      { userId: userId },
      userData,
      {
        new: true,
        runValidators: true,
      },
    ).select('-password -_id -orders -__v')

    return result
  }
}

const deleteUserFromDB = async (userId: number): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndDelete(userId)
  return result
}

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getUpdatedUserFromDB,
  deleteUserFromDB,
}
