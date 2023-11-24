import { Request, Response } from 'express'
import { userServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body

    const result = await userServices.createUserIntoDB(user)

    res.status(201).json({
      success: true,
      message: 'User created successfully',
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

const getAllUsers = async (req: Request, res: Response) => {
  const result = await userServices.getAllUsersFromDB()

  res.status(200).json({
    success: true,
    message: 'Users fetched successfully!',
    data: result,
  })
}

export const userControllers = {
  createUser,
  getAllUsers,
}
