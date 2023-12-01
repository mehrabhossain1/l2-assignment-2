import { TOrder, TUser } from './user.interface'
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
    ]).project({ password: 0, _id: 0, orders: 0, __v: 0, isDeleted: 0 })

    return result
  } else {
    throw {
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  }
}

const getUpdatedUserFromDB = async (
  userId: number,
  userData: TUser,
): Promise<TUser | null> => {
  if (!(await UserModel.isUserExists(userId))) {
    throw {
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  } else {
    const result = await UserModel.findOneAndUpdate(
      { userId: userId },
      userData,
      {
        new: true,
        runValidators: true,
      },
    ).select('-password -_id -orders -__v -isDeleted')

    return result
  }
}

const deleteUserFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw {
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  } else {
    const result = await UserModel.updateOne({ userId }, { isDeleted: true })
    return result
  }
}

//  Order Management
const addOrderIntoDB = async (userId: number, orderData: TOrder) => {
  const user = await UserModel.findOne({ userId })

  if (!user) {
    throw {
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  }

  if (!user.orders) {
    user.orders = []
  }

  user.orders.push(orderData)
  await user.save()

  return { orders: user.orders }
}

const getAllOrdersOfTheUserFromDB = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw {
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  } else {
    const result = await UserModel.findOne({ userId }).select('orders -_id')

    return result
  }
}

const calculateTotalPriceOfAllOrders = async (userId: number) => {
  if (!(await UserModel.isUserExists(userId))) {
    throw {
      error: {
        code: 404,
        description: 'User not found!',
      },
    }
  } else {
    const result = await UserModel.aggregate([
      {
        $match: {
          userId: userId,
        },
      },
      {
        $addFields: {
          totalPrice: {
            $reduce: {
              input: '$orders',
              initialValue: 0,
              in: {
                $add: ['$$value', '$$this.price'],
              },
            },
          },
        },
      },
    ])

    return result[0].totalPrice
  }
}

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  getUpdatedUserFromDB,
  deleteUserFromDB,
  addOrderIntoDB,
  getAllOrdersOfTheUserFromDB,
  calculateTotalPriceOfAllOrders,
}
