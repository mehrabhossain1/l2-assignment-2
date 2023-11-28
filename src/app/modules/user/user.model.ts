import { Schema, model } from 'mongoose'
import { IUserModel, TUser } from './user.interface'

const orderSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
})

const userSchema = new Schema<TUser, IUserModel>({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [orderSchema],
})

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await UserModel.findOne({ userId })
  return existingUser
}

// userSchema.methods.isUserExists = async function (userId: number) {
//   const existingUser = await UserModel.findOne({ userId })
//   return existingUser
// }

const UserModel = model<TUser, IUserModel>('User', userSchema)

export default UserModel
