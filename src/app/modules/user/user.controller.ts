/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
      data: {
        userId: result.userId,
        username: result.username,
        fullName: result.fullName,
        age: result.age,
        email: result.email,
        isActive: result.isActive,
        hobbies: result.hobbies,
        address: result.address,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User already exists',
      error: error.message,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.message,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.error,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.error,
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
      data: null,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.error,
    })
  }
}

// Order Management
const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const orderData = req.body

    const result = await userServices.addOrderIntoDB(Number(userId), orderData)

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.error,
    })
  }
}

const allOrdersOfTheUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await userServices.getAllOrdersOfTheUserFromDB(
      Number(userId),
    )

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.error,
    })
  }
}

const totalPriceOfTheUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params

    const result = await userServices.calculateTotalPriceOfAllOrders(
      Number(userId),
    )

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: result,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error.error,
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
  allOrdersOfTheUser,
  totalPriceOfTheUser,
}
