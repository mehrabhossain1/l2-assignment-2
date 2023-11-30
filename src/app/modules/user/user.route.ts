import express from 'express'
import { userControllers } from './user.controller'

const router = express.Router()

// User Management:
router.post('/', userControllers.createUser)

router.get('/', userControllers.getAllUsers)

router.get('/:userId', userControllers.getSingleUser)

router.put('/:userId', userControllers.updateUser)

router.delete('/:userId', userControllers.deleteUser)

// Order Management:
router.put('/:userId/orders', userControllers.addOrder)

router.get('/:userId/orders', userControllers.allOrdersOfTheUser)

export const userRoutes = router
