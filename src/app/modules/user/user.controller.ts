import { Request, Response } from 'express'
import { userServices } from './user.service'
// import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    // const zodParsedData = userValidationSchema.parse(user)

    const result = await userServices.createUserIntoDB(user)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User already exists',
      error,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB()

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await userServices.getSingleUserFromDB(Number(userId))

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.message,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body

    const { userId } = req.params

    const result = await userServices.getUpdatedUserFromDB(
      Number(userId),
      userData,
    )

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.message,
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await userServices.deleteUserFromDB(Number(userId))

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.message,
    })
  }
}

const addOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const orderData = req.body

    const result = await userServices.addOrderIntoDB(Number(userId), orderData)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.message,
    })
  }
}

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
}
