import { Schema, model } from 'mongoose'
import { IUserModel, TUser } from './user.interface'
import config from '../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<TUser, IUserModel>(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, required: true },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
      required: true,
    },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true, // for generate createdAt and updatedAt by default
  },
)

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save data')

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this

  // Hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )

  next()
})

// Middleware --> post save middleware / hook
userSchema.post('save', function (doc, next) {
  doc.password = ''
  console.log(this, 'post hook: Student saved successfully')

  next()
})

userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await UserModel.findOne({ id })

  return existingUser
}

export const UserModel = model<TUser, IUserModel>('User', userSchema)
