import { Document, Model, model, Schema } from 'mongoose';

export interface IUserDocument extends Document {
  name: string;
  email: string;
  createdOn: Date;
  updatedOn: Date;
  hashed_password: string;
  salt: string;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (!value.match(/.+\@.+\..+/)) {
        throw new Error('Please fill a valid email address');
      }
    },
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  updatedOn: {
    type: Date,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
});

userSchema
  .virtual('password')
  .set(function (password: string) {
    this._password = password;
  })
  .get(function () {
    return this._password;
  });

export const UserModel = model<IUserDocument, IUserModel>('User', userSchema, 'users');
