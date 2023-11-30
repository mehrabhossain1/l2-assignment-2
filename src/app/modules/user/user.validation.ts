import { z } from 'zod'

const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
})

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().max(10),
  password: z.string().max(20),
  fullName: z.object({
    firstName: z.string().max(10),
    lastName: z.string().max(10),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  isDeleted: z.boolean(),
  orders: z.array(orderValidationSchema),
})

export default userValidationSchema
