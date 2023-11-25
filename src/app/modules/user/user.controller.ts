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
  } catch (error) {
    res.send(500).json({
      success: false,
      message: 'User not found',
      error,
    })
  }
}

// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userData = req.body
//     const { userId } = req.params
//     const result = await userServices.updateUserInDB(Number(userId), userData)

//     res.status(200).json({
//       status: 'success',
//       message: 'User updated successfully!',
//       data: result,
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  // updateUser,
}
